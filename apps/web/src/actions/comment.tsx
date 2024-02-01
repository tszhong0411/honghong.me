'use server'

import { type Prisma } from '@prisma/client'
import { CommentNotification } from '@tszhong0411/emails'
import { revalidatePath } from 'next/cache'
import { serialize } from 'next-mdx-remote/serialize'
import { Resend } from 'resend'
import { z } from 'zod'

import { rehypePlugins } from '@/config/rehype-plugins'
import { remarkPlugins } from '@/config/remark-plugins'
import { env } from '@/env'
import { type BlogMetadata, getPage } from '@/lib/mdx'
import prisma from '@/lib/prisma'
import { type getComments } from '@/queries/comments'
import getErrorMessage from '@/utils/get-error-message'

import { privateAction } from './private-action'

const resend = new Resend(env.RESEND_API_KEY)

export const getMarkdownPreview = async (content: string) => {
  const result = await serialize(content, {
    mdxOptions: {
      // @ts-expect-error I don't know what's wrong
      rehypePlugins,
      remarkPlugins
    }
  })
  return {
    result
  }
}

export const postComment = (slug: string, comment: string, parentId?: string) =>
  privateAction(async (user) => {
    const schema = z.object({
      comment: z.string().min(1, {
        message: 'Comment is required.'
      }),
      slug: z.string().min(1, {
        message: 'Slug is required.'
      }),
      parentId: z.string().optional()
    })

    const parsed = schema.safeParse({
      comment,
      slug,
      parentId
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const {
      comment: parsedComment,
      slug: parsedSlug,
      parentId: parsedParentId
    } = parsed.data

    try {
      const processedComment = await getMarkdownPreview(parsedComment)

      const createdComment = await prisma.comment.create({
        data: {
          body: processedComment.result.compiledSource,
          Post: {
            connect: {
              slug: parsedSlug
            }
          },
          user: {
            connect: {
              id: user.id
            }
          },
          ...(parentId && {
            parent: {
              connect: {
                id: parsedParentId
              }
            }
          })
        }
      })

      const {
        metadata: { title }
      } = getPage<BlogMetadata>(`/blog/${slug}`)!

      if (!parentId) {
        await prisma.commentUpvote.create({
          data: {
            user: {
              connect: {
                id: user.id
              }
            },
            comment: {
              connect: {
                id: createdComment.id
              }
            }
          }
        })

        if (user.role === 'user' && process.env.NODE_ENV === 'production') {
          await resend.emails.send({
            from: 'Hong from honghong.me <me@honghong.me>',
            to: env.AUTHOR_EMAIL,
            subject: 'New comment posted',
            react: CommentNotification({
              title,
              name: user.name as string,
              commenterName: user.name as string,
              comment: parsedComment,
              commentUrl: `https://honghong.me/blog/${slug}#comment-${createdComment.id}`,
              postUrl: `https://honghong.me/blog/${slug}`,
              type: 'comment'
            })
          })
        }
      }

      if (parentId) {
        const parentComment = await prisma.comment.findUnique({
          where: {
            id: parentId
          },
          select: {
            user: {
              select: {
                email: true
              }
            }
          }
        })

        if (
          parentComment &&
          parentComment.user.email !== user.email &&
          process.env.NODE_ENV === 'production'
        ) {
          await resend.emails.send({
            from: 'Hong from honghong.me <me@honghong.me>',
            to: parentComment.user.email as string,
            subject: 'New reply posted',
            react: CommentNotification({
              title,
              name: user.name as string,
              commenterName: user.name as string,
              comment: parsedComment,
              commentUrl: `https://honghong.me/blog/${slug}#comment-${createdComment.id}`,
              postUrl: `https://honghong.me/blog/${slug}`,
              type: 'reply'
            })
          })
        }
      }
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/blog/[slug]', 'page')
    return {
      message: 'Posted a comment.'
    }
  })

export const deleteComment = (id: string) =>
  privateAction(async (user) => {
    const schema = z.object({
      id: z.string().min(1, {
        message: 'ID is required.'
      })
    })

    const parsed = schema.safeParse({
      id
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const { id: parsedId } = parsed.data

    const email = user.email

    const comment = await prisma.comment.findUnique({
      where: {
        id: parsedId
      },
      select: {
        user: {
          select: {
            email: true
          }
        },
        replies: true,
        parentId: true
      }
    })

    if (!comment) {
      return {
        message: 'Comment not found',
        error: true
      }
    }

    if (comment.user.email !== email) {
      return {
        message: 'Unauthorized',
        error: true
      }
    }

    try {
      // If the comment has replies, just mark it as deleted.
      if (comment.replies.length > 0) {
        await prisma.comment.update({
          where: {
            id: parsedId
          },
          data: {
            body: '[This comment has been deleted]',
            isDeleted: true
          }
        })
      } else {
        await prisma.comment.delete({
          where: {
            id: parsedId
          }
        })

        if (comment.parentId) {
          const parent = await prisma.comment.findUnique({
            where: {
              id: comment.parentId,
              isDeleted: true
            },
            select: {
              replies: true
            }
          })

          // If the parent comment (which is marked as deleted) has no replies, delete it also.
          if (parent?.replies.length === 0) {
            await prisma.comment.delete({
              where: {
                id: comment.parentId
              }
            })
          }
        }
      }
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/blog/[slug]', 'page')
    return {
      message: 'Deleted a comment.'
    }
  })

export const upvoteComment = (id: string) =>
  privateAction(async (user) => {
    const schema = z.object({
      id: z.string().min(1, {
        message: 'ID is required.'
      })
    })

    const parsed = schema.safeParse({
      id
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const { id: parsedId } = parsed.data

    const comment = await prisma.comment.findUnique({
      where: {
        id: parsedId
      },
      select: {
        upvotes: {
          where: {
            userId: user.id
          }
        }
      }
    })

    if (!comment) {
      return {
        message: 'Comment not found',
        error: true
      }
    }

    if (comment.upvotes.length > 0) {
      await prisma.commentUpvote.delete({
        where: {
          id: comment.upvotes[0]!.id
        }
      })

      revalidatePath('/blog/[slug]', 'page')
      return {
        message: 'Removed an upvote.'
      }
    }

    try {
      await prisma.commentUpvote.create({
        data: {
          user: {
            connect: {
              id: user.id
            }
          },
          comment: {
            connect: {
              id: parsedId
            }
          }
        }
      })
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/blog/[slug]', 'page')
    return {
      message: 'Upvoted a comment.'
    }
  })

export type Comment = Prisma.PromiseReturnType<typeof getComments>[0]
export type CommentWithReplies = Comment & {
  replies: CommentWithReplies[]
}

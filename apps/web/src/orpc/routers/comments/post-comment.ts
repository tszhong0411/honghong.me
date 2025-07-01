import { ORPCError } from '@orpc/client'
import { createId } from '@paralleldrive/cuid2'
import { comments, eq } from '@tszhong0411/db'
import { CommentEmailTemplate, ReplyEmailTemplate } from '@tszhong0411/emails'
import { env } from '@tszhong0411/env'
import { allPosts } from 'content-collections'
import { z } from 'zod'

import { isProduction } from '@/lib/constants'
import { resend } from '@/lib/resend'
import { protectedProcedure } from '@/orpc/root'
import { getDefaultImage } from '@/utils/get-default-image'

export const postComment = protectedProcedure
  .input(
    z.object({
      slug: z.string().min(1),
      content: z.string().min(1),
      date: z.string().min(1),
      parentId: z.string().optional()
    })
  )
  .handler(async ({ input, context }) => {
    const user = context.session.user

    const commentId = createId()

    const page = allPosts.find((post) => post.slug === input.slug)

    if (!page) throw new ORPCError('NOT_FOUND', { message: 'Blog post not found' })

    const title = page.title
    const defaultImage = getDefaultImage(user.id)

    const userProfile = {
      name: user.name,
      image: user.image ?? defaultImage
    }

    const post = {
      title,
      url: `https://nelsonlai.me/blog/${input.slug}`
    }

    await context.db.transaction(async (tx) => {
      await tx.insert(comments).values({
        id: commentId,
        body: input.content,
        userId: user.id,
        postId: input.slug,
        parentId: input.parentId
      })

      // Notify the author of the blog post via email
      if (!input.parentId && user.role === 'user') {
        if (!isProduction || !resend) return

        await resend.emails.send({
          from: 'Nelson Lai <me@nelsonlai.me>',
          to: env.AUTHOR_EMAIL,
          subject: 'New comment on your blog post',
          react: CommentEmailTemplate({
            comment: input.content,
            commenter: userProfile,
            id: `comment=${commentId}`,
            date: input.date,
            post
          })
        })
      }

      // Notify the parent comment owner via email
      if (input.parentId) {
        if (!isProduction || !resend) return

        const parentComment = await tx.query.comments.findFirst({
          where: eq(comments.id, input.parentId),
          with: {
            user: true
          }
        })

        if (parentComment && parentComment.user.email !== user.email) {
          await resend.emails.send({
            from: 'Nelson Lai <me@nelsonlai.me>',
            to: parentComment.user.email,
            subject: 'New reply to your comment',
            react: ReplyEmailTemplate({
              reply: input.content,
              replier: userProfile,
              comment: parentComment.body,
              id: `comment=${input.parentId}&reply=${commentId}`,
              date: input.date,
              post
            })
          })
        }
      }
    })
  })

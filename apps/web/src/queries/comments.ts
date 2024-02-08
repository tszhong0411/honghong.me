import prisma from '@/lib/prisma'

export const getComments = async (slug: string) => {
  return await prisma.comment.findMany({
    where: {
      Post: {
        slug
      }
    },
    include: {
      user: true,
      upvotes: true
    }
  })
}

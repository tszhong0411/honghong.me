import prisma from '@/lib/prisma'

export const getMessages = async () => {
  return await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  })
}

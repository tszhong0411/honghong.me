import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  /**
   * The Prisma client instance.
   */
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

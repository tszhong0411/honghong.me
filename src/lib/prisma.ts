import { PrismaClient } from '@prisma/client'

import { isProduction } from './constants'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (!isProduction) globalForPrisma.prisma = prisma

export default prisma

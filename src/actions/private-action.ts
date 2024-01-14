import { type User } from '@prisma/client'

import { getCurrentUser } from '@/lib/auth'

export const privateAction = async (fn: (user: User) => Promise<void>) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  await fn(user)
}

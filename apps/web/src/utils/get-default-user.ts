import { SITE_URL } from '@/lib/constants'

export const getDefaultUser = (id: string) => ({
  defaultName: `user ${id.slice(0, 6)}`,
  defaultImage: `${SITE_URL}/api/avatar/${id}`
})

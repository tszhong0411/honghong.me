'use client'

import UsersTable from '@/components/admin/users/users-table'
import { api } from '@/trpc/react'

const Page = () => {
  const { status, data } = api.users.getUsers.useQuery()

  const isLoading = status === 'pending'
  const isError = status === 'error'

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return <UsersTable data={data.users} />
}

export default Page

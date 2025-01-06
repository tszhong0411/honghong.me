import { MessagesSquareIcon, UsersIcon } from 'lucide-react'

export const ADMIN_SIDEBAR_LINKS = [
  {
    title: 'General',
    links: [
      {
        title: 'Users',
        url: '/admin/users',
        icon: UsersIcon
      },
      {
        title: 'Comments',
        url: '/admin/comments',
        icon: MessagesSquareIcon
      }
    ]
  }
]

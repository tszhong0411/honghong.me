import { LayoutDashboardIcon, MessagesSquareIcon, UsersIcon } from 'lucide-react'

export type SidebarLink = {
  title: string
  url: string
  icon: React.ComponentType
}

export type SidebarGroup = {
  title: string
  links: SidebarLink[]
}

export const ADMIN_SIDEBAR_LINKS: SidebarGroup[] = [
  {
    title: 'General',
    links: [
      {
        title: 'Dashboard',
        url: '/admin',
        icon: LayoutDashboardIcon
      },
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

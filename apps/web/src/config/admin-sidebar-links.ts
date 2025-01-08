import { LayoutDashboardIcon, MessagesSquareIcon, UsersIcon } from 'lucide-react'

export const ADMIN_SIDEBAR_LINKS = [
  {
    titleKey: 'general',
    links: [
      {
        titleKey: 'dashboard',
        url: '/admin',
        icon: LayoutDashboardIcon
      },
      {
        titleKey: 'users',
        url: '/admin/users',
        icon: UsersIcon
      },
      {
        titleKey: 'comments',
        url: '/admin/comments',
        icon: MessagesSquareIcon
      }
    ]
  }
] as const

export type SidebarGroup = (typeof ADMIN_SIDEBAR_LINKS)[number]
export type SidebarLink = SidebarGroup['links'][number]

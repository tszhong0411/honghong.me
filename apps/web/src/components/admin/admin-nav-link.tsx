import { usePathname } from '@tszhong0411/i18n/routing'
import { SidebarMenuButton, SidebarMenuItem } from '@tszhong0411/ui'

import type { SidebarLink } from '@/config/admin-sidebar-links'

import Link from '../link'

type AdminNavLinkProps = SidebarLink

const AdminNavLink = (props: AdminNavLinkProps) => {
  const { title, url, icon: Icon } = props
  const pathname = usePathname()
  const isActive = url === pathname

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={url}>
          <Icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default AdminNavLink

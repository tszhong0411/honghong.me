import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '@tszhong0411/ui'

import type { SidebarGroup as SidebarGroupConfig } from '@/config/admin-sidebar-links'

import AdminNavLink from './admin-nav-link'

type AdminNavGroupProps = SidebarGroupConfig

const AdminNavGroup = (props: AdminNavGroupProps) => {
  const { title, links } = props

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link) => (
            <AdminNavLink key={link.title} {...link} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default AdminNavGroup

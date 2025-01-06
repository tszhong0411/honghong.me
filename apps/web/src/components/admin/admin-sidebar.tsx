'use client'

import { Sidebar, SidebarContent } from '@tszhong0411/ui'

import { ADMIN_SIDEBAR_LINKS } from '@/config/admin-sidebar-links'

import AdminNavGroup from './admin-nav-group'

const AdminSidebar = () => {
  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarContent>
        {ADMIN_SIDEBAR_LINKS.map((group) => (
          <AdminNavGroup key={group.titleKey} {...group} />
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar

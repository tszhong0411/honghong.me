'use client'

import { SidebarTrigger } from '@tszhong0411/ui'

import LocaleSwitcher from '../layout/locale-switcher'
import ThemeSwitcher from '../layout/theme-switcher'

import AdminProfileDropdown from './admin-profile-dropdown'

const AdminHeader = () => {
  return (
    <header className='flex items-center justify-between py-4'>
      <SidebarTrigger variant='outline' />
      <div className='flex items-center gap-3'>
        <ThemeSwitcher />
        <LocaleSwitcher />
        <AdminProfileDropdown />
      </div>
    </header>
  )
}

export default AdminHeader

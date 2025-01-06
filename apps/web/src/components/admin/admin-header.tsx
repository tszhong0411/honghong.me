'use client'

import { SidebarTrigger } from '@tszhong0411/ui'

import ThemeSwitcher from '../layout/theme-switcher'

const AdminHeader = () => {
  return (
    <header className='flex items-center justify-between py-4'>
      <SidebarTrigger variant='outline' />
      <ThemeSwitcher />
    </header>
  )
}

export default AdminHeader

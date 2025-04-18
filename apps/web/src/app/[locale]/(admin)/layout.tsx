import { redirect } from '@tszhong0411/i18n/routing'
import { SidebarProvider } from '@tszhong0411/ui'

import AdminHeader from '@/components/admin/admin-header'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { getSession } from '@/lib/auth'

type LayoutProps = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
  children: React.ReactNode
}

const Layout = async (props: LayoutProps) => {
  const { children } = props
  const { locale } = await props.params
  const session = await getSession()

  if (!session || session.user.role !== 'admin') {
    redirect({
      href: '/',
      locale
    })
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className='flex w-full flex-col overflow-x-hidden px-4'>
        <AdminHeader />
        <main className='py-6'>{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default Layout

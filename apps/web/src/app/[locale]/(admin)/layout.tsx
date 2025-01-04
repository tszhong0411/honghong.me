import { redirect } from '@tszhong0411/i18n/routing'

import { getCurrentUser } from '@/lib/auth'

type LayoutProps = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, never>>
  children: React.ReactNode
}

const Layout = async (props: LayoutProps) => {
  const { children } = props
  const { locale } = await props.params
  const session = await getCurrentUser()

  if (!session || session.role !== 'admin') {
    redirect({
      href: '/',
      locale
    })
  }

  return <main>{children}</main>
}

export default Layout

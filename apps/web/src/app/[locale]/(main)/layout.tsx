import MainLayout from '@/components/main-layout'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return <MainLayout>{children}</MainLayout>
}

export default Layout

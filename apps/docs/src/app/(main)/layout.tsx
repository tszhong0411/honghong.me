import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <>
      <Header />
      <div className='mx-auto max-w-6xl px-5 sm:px-8 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <Sidebar />
        <main className='py-12'>{children}</main>
      </div>
    </>
  )
}

export default Layout

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-between">
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-dark/95">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between py-8 px-[20px] xl:max-w-5xl">
            <div>
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                    <Image
                      src={siteMetadata.image}
                      width="32px"
                      height="32px"
                      alt="avatar"
                      className="rounded-full"
                    />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div className="hidden text-2xl font-semibold sm:block">
                      {siteMetadata.headerTitle}
                    </div>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
              </Link>
            </div>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="rounded-lg p-1 font-medium text-gray-900 hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-800 sm:p-4"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </>
  )
}

export default LayoutWrapper

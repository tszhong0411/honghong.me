import { motion } from 'framer-motion'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  navShow: boolean
  setNavShow: Dispatch<SetStateAction<boolean>>
}

export default function MobileNav({ navShow, setNavShow }: Props) {
  const onToggleNav = () => {
    setNavShow((status: boolean) => {
      if (status) {
        document.body.style.overflow = ''
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  // https://github.com/framer/motion/issues/578
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <button
        className="ml-1 h-11 w-11 p-1 px-2 text-[18px] sm:ml-4 sm:hidden"
        onClick={onToggleNav}
      >
        {navShow ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
      </button>
      {isLoaded && navShow && (
        <motion.nav
          className="visible fixed left-0 right-0 top-[60px] bottom-0 z-50 block h-full w-full max-w-[100vw] overflow-hidden overflow-y-scroll bg-white px-6 pb-6 dark:bg-gray-900 sm:hidden"
          animate={{ x: 0 }}
          initial={{ x: '100vw' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex flex-row divide-x divide-gray-200 px-2 py-4 dark:divide-gray-700">
            <div className="w-full text-center">
              <Link href="https://github.com/tszhong0411">
                <i className="fa-brands fa-github mr-1"></i>
                Github
              </Link>
            </div>
            <div className="w-full text-center">
              <Link href="https://instagram.com/tszhong0411/">
                <i className="fa-brands fa-instagram mr-1"></i>
                Instagram
              </Link>
            </div>
          </div>
          {headerNavLinks.map((link) => (
            <div key={link.title} className="border-b border-gray-300 dark:border-gray-700">
              <Link
                href={link.href}
                className="block py-4 text-base font-bold tracking-widest text-gray-900 transition-colors duration-200 hover:bg-[#fafafa] dark:text-gray-100 dark:hover:bg-[#111]"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </motion.nav>
      )}
    </>
  )
}

import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

import headerNavLinks from '@/data/headerNavLinks'

import Link from '@/components/Link'

interface Props {
  navShow: boolean
  setNavShow: Dispatch<SetStateAction<boolean>>
}

export const MobileNav = ({ navShow, setNavShow }: Props) => {
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
      <motion.button
        onClick={onToggleNav}
        className="ml-1 flex h-11 w-11 items-center justify-center bg-transparent p-0 text-lg sm:ml-4 sm:hidden"
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.7,
          rotate: 360,
          transition: { duration: 0.2 },
        }}
        aria-label="Toggle Navbar"
        type="button"
      >
        {navShow ? <CgClose size={20} /> : <GiHamburgerMenu size={20} />}
      </motion.button>
      {isLoaded && navShow && (
        <motion.nav
          className="visible fixed left-0 right-0 top-[60px] bottom-0 z-50 block h-full w-full max-w-[100vw] overflow-hidden overflow-y-scroll bg-body px-6 pb-6 dark:bg-body-dark sm:hidden"
          animate={{ x: 0 }}
          initial={{ x: '100vw' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex flex-row divide-x divide-border-primary py-4 px-2 dark:divide-border-primary-dark">
            <div className="w-full text-center">
              <a
                href="https://github.com/tszhong0411"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <FaGithub size={20} className="mr-1" />
                Github
              </a>
            </div>
            <div className="w-full text-center">
              <a
                href="https://instagram.com/tszhong0411/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <FaInstagram size={20} className="mr-1" />
                Instagram
              </a>
            </div>
          </div>
          {headerNavLinks.map((link) => (
            <div
              key={link.title}
              className="border-b border-border-primary dark:border-border-primary-dark"
            >
              <Link
                href={link.href}
                className="block py-4 px-2 text-base font-bold tracking-widest transition-colors duration-200 hover:bg-body-secondary hover:dark:bg-body-secondary-dark"
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

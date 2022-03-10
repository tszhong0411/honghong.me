import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaGlobe } from 'react-icons/fa'

export default function LanguageSwitch({ open, setOpen }) {
  const router = useRouter()

  const changeLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  // https://github.com/framer/motion/issues/578
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <motion.button
        aria-label="Switch language"
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.7,
          transition: { duration: 0.2 },
        }}
        onClick={() => {
          !open ? setOpen(true) : setOpen(false)
        }}
        className="ml-1 flex h-11 w-11 items-center justify-center bg-transparent p-0 text-lg sm:ml-4"
      >
        <FaGlobe size={20} />
      </motion.button>
      {isLoaded && (
        <AnimatePresence>
          {open && (
            <motion.div
              animate={{ y: 0 }}
              initial={{ y: -200 }}
              exit={{ y: -200, opacity: 0 }}
              className="fixed top-[60px] right-0 z-50 flex flex-row gap-x-4 rounded-md border-2 border-slate-300 bg-body-secondary py-2 px-4 dark:border-slate-700 dark:bg-body-secondary-dark md:absolute"
            >
              <div
                className="cursor-pointer rounded-md px-4 py-2 duration-300 hover:bg-body dark:hover:bg-body-dark"
                onClick={() => {
                  setOpen(false)
                  changeLanguage('zh-TW')
                }}
                aria-hidden="true"
              >
                繁體中文
              </div>
              <div
                className="cursor-pointer rounded-md px-4 py-2 duration-300 hover:bg-body dark:hover:bg-body-dark"
                onClick={() => {
                  setOpen(false)
                  changeLanguage('en')
                }}
                aria-hidden="true"
              >
                English
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

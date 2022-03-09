import cn from 'classnames'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

export default function ScrollTopAndComment() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    smoothscroll.polyfill()
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleScrollToComment = () => {
    window.scroll(0, document.getElementById('comment').offsetTop - 104)
  }

  const variants = {
    show: { opacity: 1, display: 'flex' },
    notShow: { opacity: 0, display: 'none' },
  }

  return (
    <motion.div
      className={cn('fixed right-4 bottom-16 z-50 flex-col gap-3')}
      animate={show ? 'show' : 'notShow'}
      variants={variants}
    >
      <button
        className="rounded-md bg-body-secondary p-2 text-typeface-primary hover:bg-gray-300 dark:bg-body-secondary-dark dark:text-typeface-primary-dark dark:hover:bg-gray-600"
        aria-label="Scroll To Comment"
        type="button"
        onClick={handleScrollToComment}
      >
        <svg
          className="h-4 w-4 fill-typeface-primary dark:fill-typeface-primary-dark"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="rounded-md bg-body-secondary p-2 text-typeface-primary hover:bg-gray-300 dark:bg-body-secondary-dark dark:text-typeface-primary-dark dark:hover:bg-gray-600"
      >
        <svg
          className="h-4 w-4 fill-typeface-primary dark:fill-typeface-primary-dark"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
  )
}

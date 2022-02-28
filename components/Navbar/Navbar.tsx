import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '../Link'
import ThemeSwitch from '../ThemeSwitch'
import LanguageSwitch from '../LanguageSwitch'
import MobileNav from '../MobileNav'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'

function NavItem({ href, text }) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link
      data-cy="nav-item"
      href={href}
      className={`hover:text-themeColor-500 dark:hover:text-themeColor-350 ${
        isActive
          ? 'text-themeColor-500 dark:text-themeColor-350'
          : 'text-slate-700 dark:text-slate-200'
      } hidden rounded-lg py-1 px-2 font-semibold  transition-all sm:inline-block sm:py-3 md:px-4`}
    >
      <span className="relative">
        {text}
        {isActive && (
          <motion.div
            className="absolute top-full mt-2 h-1 w-full rounded-2xl bg-themeColor-500 opacity-[0.85] dark:bg-themeColor-350"
            layoutId="underline"
          />
        )}
      </span>
    </Link>
  )
}

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

export default function Navbar() {
  const isTop = useIsScrollTop()
  const [navShow, setNavShow] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 h-full w-full"
          onClick={() => {
            setOpen(false)
          }}
          aria-hidden="true"
        ></div>
      )}
      <header
        className={`duration-0 sticky top-0 z-40 w-full flex-none transition-colors lg:z-50 ${
          isTop
            ? 'supports-backdrop-blur:bg-white/60 dark:bg-transparent'
            : `supports-backdrop-blur:bg-white/95 ${
                navShow
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-white/75 backdrop-blur dark:bg-gray-900/75'
              }`
        }`}
      >
        <div className="mx-auto max-w-3xl">
          <div className="py-2 px-4 xl:px-0">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                <div className="sm:hidden">
                  <Link href="/" aria-label={siteMetadata.headerTitle}>
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      className="ml-4 fill-themeColor-500 dark:fill-themeColor-350"
                      viewBox="0 0 661.000000 1111.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g transform="translate(0.000000,1111.000000) scale(0.100000,-0.100000)">
                        <path
                          d="M1760 10979 c-147 -108 -301 -202 -967 -591 l-792 -463 -1 -2923 0
-2922 48 27 c27 16 207 120 400 233 l351 205 1 2485 0 2485 390 198 390 198
-2 -2897 -3 -2897 -787 -461 -788 -461 1 -240 0 -240 1187 -695 1187 -696 5
1163 5 1163 920 528 920 528 5 -2255 5 -2254 213 -99 213 -98 184 133 c152
111 318 213 974 596 l791 463 0 2920 c0 2332 -3 2919 -12 2915 -7 -3 -186
-106 -398 -230 l-385 -225 -3 -2486 -2 -2485 -387 -195 c-212 -108 -388 -196
-389 -196 -2 0 -4 1302 -4 2893 l0 2892 788 462 787 462 0 241 0 241 -1184
695 c-651 382 -1186 694 -1187 694 -2 0 -5 -523 -6 -1162 l-3 -1162 -919 -528
c-505 -290 -920 -528 -922 -528 -2 0 -4 1014 -4 2253 l0 2253 -210 97 c-115
53 -215 97 -222 96 -7 0 -92 -59 -188 -130z m3478 -2707 c106 -57 192 -107
192 -111 0 -7 -65 -44 -307 -173 l-93 -50 0 222 c0 122 4 220 8 218 4 -1 94
-50 200 -106z m-1010 -2188 l-3 -435 -905 -520 c-498 -286 -913 -525 -922
-530 -17 -9 -18 14 -18 428 l0 438 918 527 c504 290 920 527 925 527 4 1 6
-195 5 -435z m-2650 -3237 l-3 -113 -203 110 c-170 92 -200 111 -185 120 10 6
101 56 203 111 l185 100 3 -107 c1 -59 1 -158 0 -221z"
                        />
                      </g>
                    </svg>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <AnimateSharedLayout>
                    {headerNavLinks.map((link, index) => (
                      <NavItem key={index} href={link.href} text={link.title} />
                    ))}
                  </AnimateSharedLayout>
                </div>
              </div>
              <div className="flex items-center border-l border-gray-200 dark:border-gray-700">
                <ThemeSwitch />
                <LanguageSwitch open={open} setOpen={setOpen} />
                <MobileNav navShow={navShow} setNavShow={setNavShow} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

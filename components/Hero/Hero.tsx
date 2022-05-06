import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import Link from '@/components/Link'

export default function Hero() {
  const { theme, resolvedTheme } = useTheme()

  return (
    <>
      <div className="mx-auto mt-12 mb-24 flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="pb-6 text-3xl font-bold sm:text-6xl">小康</h1>
          <p>A teenager who loves web development</p>
          <div>
            <ul className="flex gap-x-2 text-sm text-typeface-secondary dark:text-typeface-secondary-dark">
              <li>#react</li>
              <li>#next.js</li>
              <li>#tailwind</li>
            </ul>
          </div>
          <div className="mt-8">
            <div className="inline-flex flex-col items-start gap-x-4 gap-y-3 sm:flex-row">
              <Link
                href="https://instagram.com/tszhong0411/"
                className="border-b-2 border-transparent duration-300 hover:border-brand"
              >
                Instagram
              </Link>
              <Link
                href="https://github.com/tszhong0411"
                className="border-b-2 border-transparent duration-300 hover:border-brand"
              >
                Github
              </Link>
              <Link
                href="https://honghong.me/youtube"
                className="border-b-2 border-transparent duration-300 hover:border-brand"
              >
                Youtube
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            style={{ height: '130px', width: '130px', position: 'relative' }}
          >
            <Image
              src={
                theme === 'dark' || resolvedTheme === 'dark'
                  ? '/static/images/logo/logo-white.png'
                  : '/static/images/logo/logo-black.png'
              }
              alt="Avatar"
              layout="fill"
              objectFit="contain"
              className="select-none rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}

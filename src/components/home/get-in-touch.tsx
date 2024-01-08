'use client'

import { motion, useAnimate, useInView } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

const GetInTouch = () => {
  const [scope, animate] = useAnimate()
  const cardsRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })

  React.useEffect(() => {
    animate(
      [
        ['#pointer', { left: 200, top: 60 }, { duration: 0 }],
        ['#javascript', { opacity: 1 }, { duration: 0.3 }],
        [
          '#pointer',
          { left: 50, top: 102 },
          { at: '+0.5', duration: 0.5, ease: 'easeInOut' }
        ],
        ['#javascript', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
        ['#react-js', { opacity: 1 }, { duration: 0.3 }],
        [
          '#pointer',
          { left: 224, top: 170 },
          { at: '+0.5', duration: 0.5, ease: 'easeInOut' }
        ],
        ['#react-js', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
        ['#typescript', { opacity: 1 }, { duration: 0.3 }],
        [
          '#pointer',
          { left: 88, top: 198 },
          { at: '+0.5', duration: 0.5, ease: 'easeInOut' }
        ],
        ['#typescript', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
        ['#next-js', { opacity: 1 }, { duration: 0.3 }],
        [
          '#pointer',
          { left: 200, top: 60 },
          { at: '+0.5', duration: 0.5, ease: 'easeInOut' }
        ],
        ['#next-js', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }]
      ],
      {
        repeat: Number.POSITIVE_INFINITY
      }
    )
  }, [animate])

  return (
    <motion.div
      className='relative rounded-xl p-1 shadow-card-border backdrop-blur-lg will-change-[transform,opacity]'
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5
      }}
    >
      <div className='flex flex-col gap-6 rounded-[11px] bg-background-lighter/60 p-4 lg:p-6'>
        {/* Main */}
        <div className='flex gap-12 max-md:flex-col'>
          {/* Animation with some badges */}
          <div className='relative size-64 max-md:mx-auto' ref={scope}>
            <Image
              src='/images/me.png'
              width={3975}
              height={3975}
              className='absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-[20px]'
              alt='Me sit in front of my desk and coding'
            />
            <div
              id='next-js'
              className='absolute bottom-12 left-14 rounded-3xl border bg-gradient-to-b from-zinc-800 to-zinc-900 px-2 py-1.5 text-xs opacity-40'
            >
              Next.js
            </div>
            <div
              id='react-js'
              className='absolute left-2 top-20 rounded-3xl border bg-gradient-to-b from-zinc-800 to-zinc-900 px-2 py-1.5 text-xs opacity-40'
            >
              React.js
            </div>
            <div
              id='typescript'
              className='absolute bottom-20 right-1 rounded-3xl border bg-gradient-to-b from-zinc-800 to-zinc-900 px-2 py-1.5 text-xs opacity-40'
            >
              TypeScript
            </div>
            <div
              id='javascript'
              className='absolute right-8 top-10 rounded-3xl border bg-gradient-to-b from-zinc-800 to-zinc-900 px-2 py-1.5 text-xs opacity-40'
            >
              JavaScript
            </div>

            <div id='pointer' className='absolute'>
              <svg
                width='16.8'
                height='18.2'
                viewBox='0 0 12 13'
                className='fill-red-500'
                stroke='white'
                strokeWidth='1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z'
                />
              </svg>
              <span className='relative left-4 rounded-3xl bg-red-500 px-2 py-0.5 text-xs'>
                Hong
              </span>
            </div>
          </div>

          {/* Right part with an email button */}
          <div className='flex flex-col justify-center px-4'>
            <p className='mb-2 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text font-calcom text-3xl font-bold text-transparent'>
              Any questions about Next.js?
            </p>
            <p className='text-zinc-300'>
              Feel free to reach out to me!{' '}
              <span className='text-muted-foreground'>
                I&apos;m unavailable for a new project.
              </span>
            </p>
            <div className='my-8'>
              <a
                href='mailto:me@honghong.me'
                className='rounded-full bg-[linear-gradient(180deg,rgb(210,10,30,1)5%,rgb(239,90,90,1)100%)] px-4 py-2 text-sm'
              >
                me@honghong.me
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GetInTouch

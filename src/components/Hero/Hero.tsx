import { motion } from 'framer-motion';
import Image from 'next/image';

import Link from '@/components/Link';

export default function Hero() {
  return (
    <>
      <div className='mx-auto mt-12 mb-24 flex max-w-5xl items-center justify-between text-base-content dark:text-primary-content'>
        <div>
          <h1 className='pb-6 text-3xl font-medium sm:text-6xl'>小康</h1>
          <p>A teenager who loves web development</p>
          <div className='my-2'>
            <ul className='flex gap-x-2 text-sm'>
              <li className='badge'>#react</li>
              <li className='badge'>#next.js</li>
              <li className='badge'>#tailwind</li>
            </ul>
          </div>
          <div className='mt-8'>
            <div className='inline-flex flex-col items-start gap-x-4 gap-y-3 sm:flex-row'>
              <Link
                href='https://instagram.com/tszhong0411/'
                className='link link-hover'
              >
                Instagram
              </Link>
              <Link
                href='https://github.com/tszhong0411'
                className='link link-hover'
              >
                Github
              </Link>
              <Link
                href='https://honghong.me/youtube'
                className='link link-hover'
              >
                Youtube
              </Link>
            </div>
          </div>
        </div>
        <div className='avatar hidden sm:block'>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            style={{ height: '130px', width: '130px', position: 'relative' }}
          >
            <Image
              src='/static/images/logo/logo-black.png'
              alt='Avatar'
              layout='fill'
              objectFit='contain'
              className='select-none rounded-full'
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}

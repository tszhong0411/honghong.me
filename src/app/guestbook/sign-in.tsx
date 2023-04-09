'use client'

import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <>
      <button
        className='rounded-lg border border-black bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'
        onClick={() => signIn('github')}
        type='button'
      >
        Login
      </button>
      <span className='ml-2'>to continue leaving a message</span>
    </>
  )
}

export default SignIn

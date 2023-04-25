'use client'

import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <>
      <button
        className='rounded-lg border border-white bg-white px-4 py-2 text-black transition-colors duration-300 hover:bg-black hover:text-white'
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

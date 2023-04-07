'use client'

import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <>
      <button
        className='rounded-lg bg-theme-9 px-4 py-2 text-white transition-colors duration-300 hover:bg-theme-10'
        onClick={() => signIn()}
        type='button'
      >
        登入
      </button>
      <span className='ml-2'>以繼續留言</span>
    </>
  )
}

export default SignIn

'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui'

const SignIn = () => {
  return (
    <>
      <Button
        className='inline-block bg-gradient-to-br from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold text-white'
        onClick={() => signIn('github')}
        type='button'
      >
        Login
      </Button>
      <span className='ml-2'>to continue leaving a message</span>
    </>
  )
}

export default SignIn

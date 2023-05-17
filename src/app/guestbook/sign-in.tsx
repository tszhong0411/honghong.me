'use client'

import { Button } from '@tszhong0411/ui'
import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <>
      <Button
        className='inline-block'
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

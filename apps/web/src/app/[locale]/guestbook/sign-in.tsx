'use client'

import { Button } from '@tszhong0411/ui'

import { setModals } from '@/store/modals'

const SignIn = () => {
  return (
    <>
      <Button
        className='dark:text-foreground inline-block bg-gradient-to-br from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold'
        onClick={() => {
          setModals({ signIn: true })
        }}
        type='button'
      >
        Login
      </Button>
      <span className='ml-2'>to continue leaving a message</span>
    </>
  )
}

export default SignIn

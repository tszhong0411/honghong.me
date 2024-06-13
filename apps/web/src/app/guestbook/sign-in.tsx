'use client'

import { Button } from '@tszhong0411/ui'

import { useSignInModalStore } from '@/stores/use-sign-in-modal-store'

const SignIn = () => {
  const { setOpen } = useSignInModalStore()

  return (
    <>
      <Button
        className='dark:text-foreground inline-block bg-gradient-to-br from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold'
        onClick={() => {
          setOpen(true)
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

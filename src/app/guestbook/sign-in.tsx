'use client'

import { Button } from '@/components/ui'
import { useSignInModal } from '@/store/use-sign-in-modal'

const SignIn = () => {
  const { setOpen } = useSignInModal()

  return (
    <>
      <Button
        className='inline-block bg-gradient-to-br from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold text-foreground'
        onClick={() => setOpen(true)}
        type='button'
      >
        Login
      </Button>
      <span className='ml-2'>to continue leaving a message</span>
    </>
  )
}

export default SignIn

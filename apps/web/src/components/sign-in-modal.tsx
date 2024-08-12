'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { useStore } from '@nanostores/react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@tszhong0411/ui'
import { Loader2Icon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { modals, setModals } from '@/store/modals'

const GoogleIcon = () => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 48 48'
      className='mr-3 size-6'
    >
      <path
        fill='#EA4335'
        d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
      />
      <path
        fill='#4285F4'
        d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
      />
      <path
        fill='#FBBC05'
        d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
      />
      <path
        fill='#34A853'
        d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
      />
      <path fill='none' d='M0 0h48v48H0z' />
    </svg>
  )
}

const SignInModal = () => {
  const { signIn: isOpened } = useStore(modals)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  return (
    <Dialog
      open={isOpened}
      onOpenChange={(v) => {
        setModals({ signIn: v })
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-left text-2xl'>Sign in</DialogTitle>
          <DialogDescription className='text-left'>to continue to honghong.me</DialogDescription>
        </DialogHeader>
        <div className='my-6 flex flex-col gap-4'>
          <Button
            type='button'
            className='h-10 rounded-xl font-bold'
            onClick={() => {
              setIsGitHubLoading(true)
              void signIn('github')
            }}
            disabled={isGitHubLoading || isGoogleLoading}
          >
            {isGitHubLoading ? (
              <Loader2Icon className='animate-spin' />
            ) : (
              <>
                <SiGithub className='mr-3' />
                Continue with GitHub
              </>
            )}
          </Button>
          <Button
            type='button'
            className='h-10 rounded-xl border font-bold'
            variant='ghost'
            onClick={() => {
              setIsGoogleLoading(true)
              void signIn('google')
            }}
            disabled={isGitHubLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2Icon className='animate-spin' />
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignInModal

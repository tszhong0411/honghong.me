'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { Button } from '@tszhong0411/ui'

import { useDialogsStore } from '@/store/dialogs'

const SignIn = () => {
  const t = useTranslations()
  const { setIsSignInOpen } = useDialogsStore()

  return (
    <>
      <Button
        className='dark:text-foreground bg-linear-to-br inline-block from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold'
        onClick={() => setIsSignInOpen(true)}
      >
        {t('common.sign-in')}
      </Button>
      <span className='ml-2'>{t('guestbook.signin.description')}</span>
    </>
  )
}

export default SignIn

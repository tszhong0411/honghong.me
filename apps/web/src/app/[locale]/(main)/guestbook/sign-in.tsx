'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { Button } from '@tszhong0411/ui'
import { useSetAtom } from 'jotai'

import { dialogsAtom } from '@/store/dialogs'

const SignIn = () => {
  const t = useTranslations()
  const setDialogs = useSetAtom(dialogsAtom)

  return (
    <>
      <Button
        className='dark:text-foreground bg-linear-to-br inline-block from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold'
        onClick={() => {
          setDialogs((dialogs) => ({ ...dialogs, signIn: true }))
        }}
      >
        {t('common.sign-in')}
      </Button>
      <span className='ml-2'>{t('guestbook.signin.description')}</span>
    </>
  )
}

export default SignIn

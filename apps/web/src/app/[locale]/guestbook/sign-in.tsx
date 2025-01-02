'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { Button } from '@tszhong0411/ui'

import { setModals } from '@/store/modals'

const SignIn = () => {
  const t = useTranslations('guestbook.signin')

  return (
    <>
      <Button
        className='dark:text-foreground inline-block bg-gradient-to-br from-[#fcd34d] via-[#ef4444] to-[#ec4899] font-extrabold'
        onClick={() => {
          setModals({ signIn: true })
        }}
        type='button'
      >
        {t('button')}
      </Button>
      <span className='ml-2'>{t('description')}</span>
    </>
  )
}

export default SignIn

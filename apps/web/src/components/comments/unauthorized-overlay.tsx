import { useTranslations } from '@tszhong0411/i18n/client'
import { Button } from '@tszhong0411/ui'
import { useSetAtom } from 'jotai'

import { dialogsAtom } from '@/store/dialogs'

const UnauthorizedOverlay = () => {
  const t = useTranslations()
  const setDialogs = useSetAtom(dialogsAtom)

  return (
    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]'>
      <Button
        size='sm'
        onClick={() => {
          setDialogs((dialogs) => ({ ...dialogs, signIn: true }))
        }}
      >
        {t('common.sign-in')}
      </Button>
    </div>
  )
}

export default UnauthorizedOverlay

import { useTranslations } from '@tszhong0411/i18n/client'
import { Button } from '@tszhong0411/ui'

import { setDialogs } from '@/store/dialogs'

const UnauthorizedOverlay = () => {
  const t = useTranslations()

  return (
    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]'>
      <Button
        type='button'
        size='sm'
        onClick={() => {
          setDialogs({ signIn: true })
        }}
      >
        {t('blog.comments.sign-in')}
      </Button>
    </div>
  )
}

export default UnauthorizedOverlay

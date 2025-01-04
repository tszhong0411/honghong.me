import { useTranslations } from '@tszhong0411/i18n/client'
import { Button } from '@tszhong0411/ui'

import { setModals } from '@/store/modals'

const UnauthorizedOverlay = () => {
  const t = useTranslations()

  return (
    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]'>
      <Button
        type='button'
        size='sm'
        onClick={() => {
          setModals({ signIn: true })
        }}
      >
        {t('blog.comments.sign-in')}
      </Button>
    </div>
  )
}

export default UnauthorizedOverlay

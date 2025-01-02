'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { buttonVariants } from '@tszhong0411/ui'

import Link from './link'

const GoToHomepage = () => {
  const t = useTranslations('component')

  return (
    <Link href='/' className={buttonVariants()}>
      {t('go-to-homepage')}
    </Link>
  )
}

export default GoToHomepage

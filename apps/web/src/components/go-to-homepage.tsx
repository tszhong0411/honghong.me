'use client'

import { useTranslations } from '@tszhong0411/i18n/client'

import { buttonVariants } from '@/components/ui/button'

import Link from './link'

const GoToHomepage = () => {
  const t = useTranslations()

  return (
    <Link href='/' className={buttonVariants()}>
      {t('component.go-to-homepage')}
    </Link>
  )
}

export default GoToHomepage

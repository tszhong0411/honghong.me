import { i18n } from '@tszhong0411/i18n/config'

import { SITE_URL } from '@/lib/constants'

type LocalizedDocument = {
  slug: string
  locale: string
  absolute: boolean
}

export const getLocalizedPath = (doc: LocalizedDocument) => {
  const { slug, locale, absolute } = doc

  let localePath: string

  if (locale === i18n.defaultLocale) {
    localePath = absolute ? SITE_URL : '/'
  } else {
    localePath = `/${locale}`
  }

  return `${localePath}${slug}`
}

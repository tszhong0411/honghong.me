import { i18n } from '@tszhong0411/i18n/config'

type LocalizedDocument = {
  slug: string
  locale: string
}

export const getLocalizedPath = (doc: LocalizedDocument) => {
  const locale = doc.locale

  const localePath = locale === i18n.defaultLocale ? '' : `/${locale}`

  return `${localePath}${doc.slug}`
}

import { I18nConfigType } from '@/lib/types'

const i18nConfig: I18nConfigType = {
  locales: ['zh-TW', 'en'],
  defaultLocale: 'zh-TW',
  languages: {
    'zh-TW': {
      name: '繁體中文',
      flag: '🇹🇼',
    },
    en: {
      name: 'English',
      flag: '🇬🇧',
    },
  },
}

export default i18nConfig

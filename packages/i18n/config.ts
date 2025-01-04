export const supportedLanguages = [
  {
    code: 'en',
    label: 'English',
    default: true
  },
  {
    code: 'zh-TW',
    label: '繁體中文'
  },
  {
    code: 'zh-CN',
    label: '简体中文'
  }
]

export const i18n = {
  locales: supportedLanguages.map(({ code }) => code),
  defaultLocale: supportedLanguages.find(({ default: isDefault }) => isDefault)?.code ?? 'en'
} as const

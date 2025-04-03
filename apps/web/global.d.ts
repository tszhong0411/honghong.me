import type messages from '@tszhong0411/i18n/messages/en.json'
import type { routing } from '@tszhong0411/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}

import type en from '../messages/en.json'

import { describe, expect, it } from 'vitest'

import { i18n } from '../config'

type Messages = typeof en
type DeepObject = {
  [key: string]: string | DeepObject
}

const flattenKeys = (obj: DeepObject, prefix = ''): string[] => {
  const keys: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') {
      keys.push(fullKey)
    } else {
      keys.push(...flattenKeys(value, fullKey))
    }
  }

  return keys
}

describe('i18n messages', () => {
  it('should have matching keys across all languages', async () => {
    const defaultMessages: Messages = (await import(`../messages/${i18n.defaultLocale}.json`))
      .default

    const defaultKeys = flattenKeys(defaultMessages)

    for (const locale of i18n.locales) {
      if (locale === i18n.defaultLocale) continue

      const messages: DeepObject = (await import(`../messages/${locale}.json`)).default
      const messageKeys = flattenKeys(messages)

      // Check if all default keys exist in current locale
      for (const key of defaultKeys) {
        expect(messageKeys).toContain(key)
      }

      // Check if all locale keys exist in default
      for (const key of messageKeys) {
        expect(defaultKeys).toContain(key)
      }
    }
  })
})

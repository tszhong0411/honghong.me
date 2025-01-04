import type { NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

export const withI18n = (requestConfigPath: string, config: NextConfig) => {
  return withNextIntl(requestConfigPath)(config)
}

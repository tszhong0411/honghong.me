import type { Config } from 'tailwindcss'

import sharedConfig from '@tszhong0411/tailwind-config'

const config: Pick<Config, 'presets' | 'content'> = {
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig]
}

export default config

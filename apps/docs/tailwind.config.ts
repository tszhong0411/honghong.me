import type { Config } from 'tailwindcss'

import sharedConfig from '@tszhong0411/tailwind-config'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '92rem'
      }
    }
  }
}

export default config

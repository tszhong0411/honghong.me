import type { Config } from 'tailwindcss'

import sharedConfig from '@tszhong0411/tailwind-config'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  theme: {
    extend: {
      backgroundImage: {
        'nav-link-indicator':
          'radial-gradient(44.6% 825% at 50% 50%, rgb(255 133 133) 0%, rgb(255 72 109 / 0) 100%)',
        'nav-link-indicator-dark':
          'radial-gradient(44.6% 825% at 50% 50%, rgb(255 28 28) 0%, rgb(255 72 109 / 0) 100%)',
        'email-button': 'linear-gradient(180deg, rgb(210 10 30) 5%, rgb(239 90 90) 100%)'
      },
      boxShadow: {
        'feature-card': '0 -1px 3px 0 rgb(0 0 0 / 0.05)',
        'feature-card-dark': '0 0 0 1px rgb(255 255 255 / 0.06), 0 -1px rgb(255 255 255 / 0.1)'
      }
    }
  }
}

export default config

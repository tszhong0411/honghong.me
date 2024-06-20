import sharedConfig from '@tszhong0411/tailwind-config'
import { type Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  theme: {
    extend: {
      backgroundImage: {
        pinned:
          'linear-gradient(119deg, rgb(143 152 242) 0%, rgb(95 167 225) 30%, rgb(206 133 247) 47%, rgb(235 147 186) 69%, rgb(190 188 251) 80%)',
        'pinned-dark':
          'linear-gradient(119deg, rgb(75 87 196) 0%, rgb(31 133 206) 30%, rgb(125 20 166) 42%, rgb(134 15 60) 63%, rgb(18 8 45) 73%)',
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

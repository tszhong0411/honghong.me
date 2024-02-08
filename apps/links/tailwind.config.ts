import sharedConfig from '@tszhong0411/tailwind-config'
import { type Config } from 'tailwindcss'

const config: Pick<Config, 'presets' | 'content' | 'theme'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'float-out':
          'float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear',
        rotate: 'rotate var(--spark) linear infinite both',
        flip: 'flip calc(var(--spark) * 2) infinite steps(2, end)'
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)'
          }
        },
        'float-out': {
          to: {
            rotate: '360deg'
          }
        },
        rotate: {
          to: {
            transform: 'rotate(90deg)'
          }
        },
        flip: {
          to: {
            rotate: '360deg'
          }
        }
      }
    }
  },
  presets: [sharedConfig]
}

export default config

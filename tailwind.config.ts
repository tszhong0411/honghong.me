import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './contentlayer.config.ts'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        'background-lighter': 'rgb(var(--background-lighter))',
        foreground: 'rgb(var(--foreground))',
        'muted-foreground': 'rgb(var(--muted-foreground))',
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          highlight: 'rgb(var(--accent-highlight))'
        },
        border: {
          DEFAULT: 'rgb(var(--border))',
          highlight: 'rgb(var(--border-highlight))'
        },
        ring: 'rgb(var(--ring))'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        title: ['var(--font-title)']
      },
      boxShadow: {
        'card-border': '0 0 0 1px #ffffff0f, 0 -1px #ffffff1a'
      },
      typography: {
        DEFAULT: {
          css: {
            'h2, h3, h4, h5, h6': {
              position: 'relative',
              scrollMarginTop: '128px',
              '& a::before': {
                content: 'none !important'
              }
            },
            img: {
              margin: '0 auto'
            },
            'code, pre code': {
              fontFamily: 'var(--font-geist-mono), var(--font-inter)'
            },
            ':not(pre) > code': {
              padding: '0.12em 0.25em',
              borderRadius: '0.375rem',
              display: 'inline-block',
              lineHeight: '1.2',
              background: '#2a2828',
              border: '1px solid #3e3c3c',

              '&::before, &::after': {
                content: 'none'
              }
            },
            pre: {
              background: 'rgb(var(--accent))',
              padding: '12px 0',
              lineHeight: 2,
              border: '1px solid rgb(var(--border))',
              '> code': {
                display: 'grid',
                counterReset: 'line',
                '> [data-line]': {
                  padding: '0 20px 0 12px',
                  borderLeft: '2px solid transparent',

                  '> [data-highlighted-chars]': {
                    padding: '2px 4px',
                    borderRadius: '0.25rem',
                    background: '#3c3c3c'
                  }
                },
                '> [data-highlighted-line]': {
                  borderLeftColor: '#fff',
                  background: '#3c3c3c'
                }
              }
            },
            '[data-rehype-pretty-code-title] ~ pre ~ button': {
              top: '60px !important'
            },
            '[data-rehype-pretty-code-title]': {
              backgroundColor: 'rgb(var(--accent))',
              border: '1px solid rgb(var(--border))',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            },
            '[data-rehype-pretty-code-title] ~ pre': {
              marginTop: '0',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
              borderTopWidth: '0'
            },
            '[data-rehype-pretty-code-figure]': {
              position: 'relative'
            }
          }
        }
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [typography, animate]
} satisfies Config

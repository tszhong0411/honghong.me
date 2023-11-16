import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './contentlayer.config.ts'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        pre: 'hsl(var(--pre))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        default: ['var(--font-inter)', ...fontFamily.sans],
        'monaspace-neon': ['var(--font-monaspace-neon)', ...fontFamily.sans],
        calcom: ['var(--font-calcom)', ...fontFamily.sans]
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
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
              fontFamily: 'var(--font-monaspace-neon), var(--font-inter)'
            },
            ':not(pre) > code': {
              padding: '0.12em 0.25em',
              borderRadius: '0.375rem',
              display: 'inline-block',
              lineHeight: '1.2',
              background: '#f7f7f7',
              border: '1px solid #ededed',

              '&::before, &::after': {
                content: 'none'
              }
            },
            pre: {
              background: 'hsl(var(--pre))',
              padding: '12px 0',
              lineHeight: 2,
              border: '1px solid hsl(var(--border))',
              '[data-line-numbers]': {
                '[data-line]::before': {
                  content: 'counter(line)',
                  counterIncrement: 'line',
                  display: 'inline-block',
                  width: '16px',
                  marginRight: '16px',
                  textAlign: 'right',
                  color: 'hsl(var(--muted-foreground) / 0.6)'
                }
              },
              '> code': {
                display: 'grid',
                counterReset: 'line',
                '> [data-line]': {
                  padding: '0 20px 0 12px',
                  borderLeft: '2px solid transparent',

                  '> [data-highlighted-chars]': {
                    padding: '2px 4px',
                    borderRadius: '0.25rem',
                    background: '#e3e3e3'
                  }
                },
                '> [data-highlighted-line]': {
                  borderLeftColor: 'hsl(var(--foreground))',
                  background: '#e3e3e3'
                }
              }
            },
            '[data-rehype-pretty-code-title] ~ pre ~ button': {
              top: '60px !important'
            },
            '[data-rehype-pretty-code-title]': {
              backgroundColor: 'hsl(var(--pre))',
              border: '1px solid hsl(var(--border))',
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
            }
          }
        },
        invert: {
          css: {
            ':not(pre) > code': {
              background: '#2a2828',
              border: '1px solid #3e3c3c'
            },
            pre: {
              '> code': {
                '> [data-line]': {
                  '> [data-highlighted-chars]': {
                    background: '#3c3c3c'
                  }
                },
                '> [data-highlighted-line]': {
                  background: '#3c3c3c'
                }
              }
            }
          }
        }
      }
    }
  },
  plugins: [typography, animate]
} satisfies Config

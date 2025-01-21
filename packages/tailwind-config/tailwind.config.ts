import type { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

import { ui } from './src/plugin'

const config: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
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
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)']
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'tree-view-content-down': {
          from: { height: '0' },
          to: { height: 'var(--height)' }
        },
        'tree-view-content-up': {
          from: { height: 'var(--height)' },
          to: { height: '0' }
        },
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' }
        },
        'marquee-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        },
        'marquee-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'tree-view-content-down': 'tree-view-content-down 0.2s ease-out',
        'tree-view-content-up': 'tree-view-content-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'marquee-left': 'marquee-left var(--duration, 30s) linear infinite',
        'marquee-up': 'marquee-up var(--duration, 30s) linear infinite'
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': "theme('colors.foreground / 90%')",
            '--tw-prose-headings': "theme('colors.foreground')",
            '--tw-prose-lead': "theme('colors.foreground')",
            '--tw-prose-links': "theme('colors.foreground')",
            '--tw-prose-bold': "theme('colors.foreground')",
            '--tw-prose-counters': "theme('colors.muted.foreground')",
            '--tw-prose-bullets': "theme('colors.muted.foreground')",
            '--tw-prose-hr': "theme('colors.border')",
            '--tw-prose-quotes': "theme('colors.foreground')",
            '--tw-prose-quote-borders': "theme('colors.border')",
            '--tw-prose-captions': "theme('colors.foreground')",
            '--tw-prose-th-borders': "theme('colors.border')",
            '--tw-prose-td-borders': "theme('colors.border')",
            '--tw-prose-code': "theme('colors.foreground')",
            '--tw-prose-kbd': false,
            '--tw-prose-kbd-shadows': false,
            '--tw-prose-pre-bg': false,
            '--tw-prose-pre-code': false,

            maxWidth: 'none',

            img: {
              margin: '0 auto'
            },

            kbd: false,

            code: {
              padding: '2px 4px',
              fontSize: '13px',
              borderRadius: '6px',
              background: "theme('colors.secondary.DEFAULT / 50%')",
              border: '1px solid hsl(var(--border))'
            },

            'pre code': false,
            'pre code::after': false,
            'pre code::before': false,
            'code::after': false,
            'code::before': false,

            'blockquote p:first-of-type::before': {
              content: 'none'
            },
            'blockquote p:first-of-type::after': {
              content: 'none'
            },
            blockquote: {
              fontStyle: 'normal'
            }
          }
        }
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [typography, animate, ui]
}

export default config

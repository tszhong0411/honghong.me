import type { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'
import animate from 'tailwindcss-animate'

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
  plugins: [
    typography,
    animate,
    plugin((api) => {
      api.addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '0 0% 3.9%',

          '--card': '0 0% 99.7%',
          '--card-foreground': '0 0% 3.9%',

          '--popover': '0 0% 100%',
          '--popover-foreground': '0 0% 15.1%',

          '--primary': '0 0% 9%',
          '--primary-foreground': '0 0% 98%',

          '--secondary': '0 0% 96.1%',
          '--secondary-foreground': '0 0% 9%',

          '--muted': '0 0% 96.1%',
          '--muted-foreground': '0 0% 45.1%',

          '--accent': '0 0% 94.1%',
          '--accent-foreground': '0 0% 9%',

          '--destructive': '0 84.2% 60.2%',
          '--destructive-foreground': '0 0% 98%',

          '--border': '0 0% 89.8%',
          '--input': '0 0% 89.8%',
          '--ring': '0 0% 63.9%',

          '--radius': '0.5rem',

          '--sidebar-background': '0 0% 98%',
          '--sidebar-foreground': '240 5.3% 26.1%',
          '--sidebar-primary': '240 5.9% 10%',
          '--sidebar-primary-foreground': '0 0% 98%',
          '--sidebar-accent': '240 4.8% 95.9%',
          '--sidebar-accent-foreground': '240 5.9% 10%',
          '--sidebar-border': '220 13% 91%',
          '--sidebar-ring': '217.2 91.2% 59.8%'
        },
        '.dark': {
          '--background': '0 0% 2%',
          '--foreground': '0 0% 100%',

          '--card': '0 0% 4%',
          '--card-foreground': '0 0% 98%',

          '--popover': '0 0% 4%',
          '--popover-foreground': '0 0% 88%',

          '--primary': '0 0% 98%',
          '--primary-foreground': '0 0% 9%',

          '--secondary': '0 0% 12.9%',
          '--secondary-foreground': '0 0% 98%',

          '--muted': '0 0% 12%',
          '--muted-foreground': '0 0% 60%',

          '--accent': '0 0% 15%',
          '--accent-foreground': '0 0% 100%',

          '--destructive': '6 84% 48%',
          '--destructive-foreground': '0 0% 98%',

          '--border': '0 0% 14%',
          '--input': '0 0% 14%',
          '--ring': '0 0% 14.9%',

          '--sidebar-background': '240 5.9% 10%',
          '--sidebar-foreground': '240 4.8% 95.9%',
          '--sidebar-primary': '224.3 76.3% 48%',
          '--sidebar-primary-foreground': '0 0% 100%',
          '--sidebar-accent': '240 3.7% 15.9%',
          '--sidebar-accent-foreground': '240 4.8% 95.9%',
          '--sidebar-border': '240 3.7% 15.9%',
          '--sidebar-ring': '217.2 91.2% 59.8%'
        },
        '*': {
          'border-color': "theme('colors.border')"
        },
        html: {
          'scroll-behavior': 'smooth'
        },
        body: {
          'background-color': "theme('colors.background')",
          color: "theme('colors.foreground')",
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale'
        }
      })
    })
  ]
}

export default config

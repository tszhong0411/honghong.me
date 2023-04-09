/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './contentlayer.config.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'hong-fg': 'var(--hong-fg)',
        'hong-bg': 'var(--hong-bg)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
      },
      fontFamily: {
        default: ['var(--font-inter)', 'var(--font-noto-sans-tc)'],
        code: [
          'var(--font-fira-code)',
          'var(--font-inter)',
          'var(--font-noto-sans-tc)',
        ],
        emoji: ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
            },
            'h2, h3, h4, h5, h6': {
              position: 'relative',
              scrollMarginTop: '128px',

              '& a::before': {
                content: 'none !important',
              },
            },
            img: {
              margin: '24px auto',
            },
            code: {
              color: theme('colors.red.500'),
              '&::before': {
                content: `"" !important`,
              },
              '&::after': {
                content: `"" !important`,
              },
              fontWeight: 'normal',
            },
            '[data-rehype-pretty-code-title]': {
              backgroundColor: 'var(--accent-1)',
              border: '1px solid var(--accent-2)',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
            },
            '[data-rehype-pretty-code-title] ~ pre': {
              marginTop: '0',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
              borderTopWidth: '0',
            },
            '[data-rehype-pretty-code-title] ~ pre ~ button': {
              top: '60px !important',
            },
            pre: {
              opacity: 0.98,
              backgroundColor: 'var(--hong-bg)',
              padding: '12px 0',
              lineHeight: 2,
              borderRadius: '8px',
              border: '1px solid var(--accent-2)',

              '[data-line-numbers]': {
                '.line::before': {
                  content: 'counter(line)',
                  counterIncrement: 'line',
                  display: 'inline-block',
                  width: '16px',
                  marginRight: '16px',
                  textAlign: 'right',
                  color: 'var(--accent-4)',
                },
                '.line.highlighted::before': {
                  color: 'var(--accent-6)',
                },
              },

              '> code': {
                display: 'grid',
                counterReset: 'line',

                '.word': {
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  padding: '4px',
                  borderRadius: '4px',
                },
                '> .line': {
                  padding: '0 20px 0 12px',
                  borderLeft: `2px solid transparent`,
                },
                '> .line.highlighted': {
                  borderLeftColor: 'rgba(239, 68, 68, 0.4)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              },
            },
            ':not(pre) > code': {
              backgroundColor: 'var(--hong-bg)',
              padding: '4px',
              fontSize: '15.2px !important',
              borderRadius: '4px',
              border: '1px solid var(--accent-2)',
            },
          },
        },
        invert: {
          css: {
            code: {
              color: theme('colors.red.400'),
            },
            pre: {
              '> code': {
                '.word': {
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                },
                '> .line.highlighted': {
                  borderLeftColor: 'rgba(239, 68, 68, 0.4)',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                },
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['invert'],
  },
  plugins: [require('@tailwindcss/typography')],
}

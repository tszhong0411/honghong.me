/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tszhong0411/**/*.{js,jsx,ts,tsx}',
    './contentlayer.config.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent-fg': 'var(--accent-fg)',
        'accent-bg': 'var(--accent-bg)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        hover: 'var(--hover)',
        danger: 'var(--danger)',
      },
      backgroundImage: {
        'rainbow-gradient':
          'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      },
      typography: {
        DEFAULT: {
          css: {
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
            'code, pre code': {
              fontFamily: 'var(--font-fira-code), var(--font-inter)',
            },
            ':not(pre) > code': {
              padding: '0.12em 0.25em',
              background: '#f7f7f7',
              border: '1px solid #ededed',
              borderRadius: '0.375rem',
              display: 'inline-block',
              lineHeight: '1.2',

              '&::before, &::after': {
                content: 'none',
              },
            },
            pre: {
              background: 'var(--accent-1)',
              padding: '12px 0',
              lineHeight: 2,
              border: '1px solid var(--accent-2)',
              '[data-line-numbers]': {
                '[data-line]::before': {
                  content: 'counter(line)',
                  counterIncrement: 'line',
                  display: 'inline-block',
                  width: '16px',
                  marginRight: '16px',
                  textAlign: 'right',
                  color: 'var(--accent-6)',
                },
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
                    background: '#3c3c3c',
                  },
                },
                '> [data-highlighted-line]': {
                  borderLeftColor: 'var(--accent-fg)',
                  background: '#e3e3e3',
                },
              },
            },
            '[data-rehype-pretty-code-title] ~ pre ~ button': {
              top: '60px !important',
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
          },
        },
        invert: {
          css: {
            ':not(pre) > code': {
              background: '#2a2828',
              border: '1px solid #3e3c3c',
            },
            pre: {
              '> code': {
                '> [data-highlighted-line]': {
                  background: '#3c3c3c',
                },
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

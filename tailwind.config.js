/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  //#region  //*=========== Theme config ===========
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: [
          'Sora',
          'Noto Sans TC',
          'Inter',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        primary: colors.red,
        gray: colors.neutral,
        dark: '#000',
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      screens: {
        xs: '375px',
        s: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        '2lg': '1190px',
        xl: '1280px',
        '2xl': '1536px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#333333',
            'h2, h3, h4': {
              color: theme('colors.black'),
            },
            a: {
              cursor: 'pointer',
              'text-decoration-line': 'underline',
              color: theme('colors.primary.500'),
            },
            code: {
              fontFamily: "'Fira Code', 'Noto Sans TC', 'Inter'",
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              padding: '2px 8px',
              border: '1px solid #eee',
              color: '#e3371e',
            },
            pre: {
              backgroundColor: '#f8f9fb',
              '& code': {
                backgroundColor: '#f8f9fb',
                border: 'none',
              },
              color: 'hsl(230, 8%, 24%)',
            },
            p: {
              color: '#2e2f3e',
            },
          },
        },
        dark: {
          css: {
            color: '#eaeaea',
            'h2, h3, h4': {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.primary.700'),
            },
            code: {
              backgroundColor: '#2a0000',
              border: '1px solid #5f0000',
            },
            pre: {
              backgroundColor: '#0f0f0f',
              '& code': {
                backgroundColor: '#0f0f0f',
                border: 'none',
              },
              color: 'hsl(0, 8%, 100%)',
            },
            p: {
              color: '#a7a9be',
            },
            strong: {
              color: 'white',
            },
          },
        },
        xl: {
          css: {
            pre: {
              margin: 0,
              padding: '0.5rem 0',
              borderRadius: '1rem',
              lineHeight: '1.5rem',
            },
          },
        },
      }),
    },
  },
  //#endregion  //*======== Theme config ===========
  //#region  //*=========== Daisyui config ===========
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#e3371e',
          secondary: '#f77f00',
          accent: '#ea5234',
          neutral: '#3d4451',
          'base-100': '#f9fafb',
          'base-200': '#f7f7f7',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#d62828',
          secondary: '#6d3a9c',
          accent: '#51a800',
          neutral: '#1b1d1d',
          'base-100': '#090b0b',
          'base-200': '#121416',
          info: '#2563eb',
          success: '#16a34a',
          warning: '#d97706',
          error: '#dc2626',
        },
      },
      // 'cupcake',
      // 'bumblebee',
      // 'emerald',
      // 'corporate',
      // 'synthwave',
      // 'retro',
      // 'cyberpunk',
      // 'valentine',
      // 'halloween',
      // 'garden',
      // 'forest',
      // 'aqua',
      // 'lofi',
      // 'pastel',
      // 'fantasy',
      // 'wireframe',
      // 'black',
      // 'luxury',
      // 'dracula',
      // 'cmyk',
      // 'autumn',
      // 'business',
      // 'acid',
      // 'lemonade',
      // 'night',
      // 'coffee',
      // 'winter',
    ],
  },
  //#endregion  //*======== Daisyui config ===========
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
};

import plugin from 'tailwindcss/plugin'

export const ui = plugin(({ addBase, addComponents }) => {
  addBase({
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

      '--radius': '0.5rem'
    },
    '.dark': {
      '--background': '0 0% 0%',
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
      '--ring': '0 0% 14.9%'
    },
    '*': {
      'border-color': "theme('colors.border')"
    },
    body: {
      'background-color': "theme('colors.background')",
      color: "theme('colors.foreground')",
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
    }
  })

  addComponents({
    '.shiki span': {
      color: 'var(--shiki-light)'
    },
    '.dark .shiki span': {
      color: 'var(--shiki-dark)'
    },
    'pre.shiki': {
      'font-size': '13px'
    },
    'pre.shiki .highlighted': {
      margin: '0 -16px',
      padding: '0 16px',
      display: 'inline-block',
      'min-width': 'calc(100% + 32px)',
      'background-color': "theme('colors.primary.DEFAULT / 10%')"
    }
  })
})

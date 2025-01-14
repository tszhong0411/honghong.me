import plugin from 'tailwindcss/plugin'

export const ui = plugin((api) => {
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
    body: {
      'background-color': "theme('colors.background')",
      color: "theme('colors.foreground')",
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
    }
  })
})

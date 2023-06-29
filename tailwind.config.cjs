import { tailwindPreset } from '@tszhong0411/ui'

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
      backgroundImage: {
        'rainbow-gradient':
          'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      },
    },
  },
  presets: [tailwindPreset],
  plugins: [require('@tailwindcss/typography')],
}

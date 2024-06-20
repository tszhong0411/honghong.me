import sharedConfig from '@tszhong0411/tailwind-config'
import { type Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig]
}

export default config

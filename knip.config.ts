import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [
    'prettier-plugin-*',
    'sharp',
    // TailwindCSS v4 is not detectable currently
    'tailwindcss',
    // Can't detect `pnpm with-env tsx`
    'tsx'
  ],
  workspaces: {
    '.': {
      entry: ['turbo/generators/config.ts']
    },
    'apps/docs': {
      entry: ['content-collections.ts', 'src/components/demos/**/*.tsx']
    },
    'apps/web': {
      entry: [
        'content-collections.ts',
        'src/i18n/request.ts',
        'src/e2e/**/*.setup.ts',
        'src/e2e/**/*.teardown.ts'
      ]
    },
    'packages/db': {
      entry: ['src/seed.ts']
    },
    'packages/eslint-config': {
      // @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
      ignoreDependencies: ['@eslint/config-inspector', 'eslint-plugin-tailwindcss']
    }
  }
}

export default config

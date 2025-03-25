import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['**/fixtures/**'],
  vitest: {
    config: ['vitest.{config,shared,workspace}.ts']
  },
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
    },
    'packages/ui': {
      // @see https://github.com/shadcn-ui/ui/issues/4792
      ignoreDependencies: ['@radix-ui/react-context', '@tailwindcss/typography']
    }
  }
}

export default config

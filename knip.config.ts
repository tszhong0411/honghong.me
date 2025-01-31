import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['**/fixtures/**'],
  vitest: {
    config: ['vitest.{config,shared,workspace}.ts']
  },
  // tailwindcss v4 is not supported currently
  ignoreDependencies: ['prettier-plugin-*', 'sharp', 'tailwindcss'],
  workspaces: {
    '.': {
      entry: ['turbo/generators/config.ts']
    },
    'apps/docs': {
      entry: ['mdx.config.ts', 'src/components/demos/**/*.tsx'],
      postcss: {
        config: 'postcss.config.mjs'
      }
    },
    'apps/web': {
      entry: ['mdx.config.ts', 'src/i18n/request.ts'],
      ignore: ['**/e2e/**'],
      postcss: {
        config: 'postcss.config.mjs'
      }
    },
    'packages/eslint-config': {
      // @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
      ignoreDependencies: ['@eslint/config-inspector', 'eslint-plugin-tailwindcss']
    },
    'packages/prettier-config': {
      prettier: {
        config: '../../prettier.config.js'
      }
    },
    'packages/ui': {
      // https://github.com/shadcn-ui/ui/issues/4792
      ignoreDependencies: ['@radix-ui/react-context', '@tailwindcss/typography']
    }
  }
}

export default config

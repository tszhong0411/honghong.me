import { type KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['**/fixtures/**'],
  vitest: {
    config: ['vitest.{config,shared,workspace}.ts']
  },
  ignoreDependencies: ['prettier-plugin-*', 'sharp'],
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
      entry: ['mdx.config.ts', 'i18n.config.ts'],
      ignore: ['**/e2e/**'],
      postcss: {
        config: 'postcss.config.mjs'
      }
    },
    'packages/eslint-config': {
      ignoreDependencies: ['@eslint/config-inspector']
    },
    'packages/prettier-config': {
      prettier: {
        config: '../../prettier.config.js'
      }
    },
    'packages/emails': {
      // Required for React 19
      ignoreDependencies: ['react-dom', '@types/react-dom']
    }
  }
}

export default config

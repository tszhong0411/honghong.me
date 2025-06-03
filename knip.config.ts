import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [
    'prettier-plugin-*',
    'sharp',
    // not sure why it can't detect `pnpm with-env tsx ./src/seed.ts` in packages/db/package.json
    'tsx',
    // @see https://github.com/webpro-nl/knip/issues/870
    '@rsbuild/plugin-react'
  ],
  // see above ignoreDependencies
  ignore: ['**/rslib.config.ts'],
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
      ignoreDependencies: ['@eslint/config-inspector']
    },
    'packages/ui': {
      ignore: ['src/styles.css']
    }
  },
  // credit to https://github.com/webpro-nl/knip/issues/1008#issuecomment-2756559038
  compilers: {
    css: (text: string) =>
      [...text.matchAll(/(?<=@)(import|plugin)[^;]+/g)].join('\n').replace('plugin', 'import')
  }
}

export default config

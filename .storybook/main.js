const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
    return config
  },
  core: {
    builder: 'webpack5',
  },
}

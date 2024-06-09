/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},
    'postcss-lightningcss': {
      browsers: '>= .25%'
    }
  }
}

export const isProduction = process.env.NODE_ENV === 'production'
export const BASE_URL = isProduction
  ? 'https://honghong.me'
  : 'http://localhost:3000'

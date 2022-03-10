export const isProd = process.env.NODE_ENV === 'production'

/**
 * Increment content views
 * @see blog.tsx
 */
export const incrementFlag = isProd

/**
 * Show Spotify Now Playing on footer
 * @see Footer.tsx
 */
export const spotifyFlag = isProd

/**
 * Show command service on contents
 * @see blog.tsx
 */
export const commentFlag = isProd

/**
 * Console to the browser greeting message
 * @see console.ts
 */
export const consoleFlag = isProd

import '@/css/prism.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/noto-sans-tc'
import '@fontsource/jetbrains-mono'
import '@fontsource/inter/variable-full.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { ThemeProvider } from 'next-themes'
import Analytics from '@/components/analytics'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { theme as defaultTheme, darkTheme, globalCss } from '@/lib/stitches.config'

const globalStyles = globalCss({
  '*,::before,::after': {
    boxSizing: 'border-box',
    borderWidth: 0,
    borderStyle: 'solid',
  },

  html: {
    margin: 0,
    lineHeight: 1.5,
    '-webkit-text-size-adjust': '100%',
    '-moz-tab-size': 4,
    tabSize: 4,
    padding: 0,
  },
  body: {
    margin: 0,
    lineHeight: 'inherit',
    backgroundColor: '$honghong-colors-body',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    color: '$honghong-colors-typeface-primary',
    fontFamily: '$normal',
  },
  'input:-webkit-autofill,input:-webkit-autofill:focus': {
    transition: 'background-color 600000s 0s, color 600000s 0s',
  },
  'code,kbd,pre,samp': {
    fontFamily: "'JetBrains Mono', monospace",
  },
  '::-webkit-scrollbar': {
    width: '7px',
    height: '5px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '$honghong-colors-brand',
    transition: '0.25s',
    borderRadius: '2px',
  },
  '::-webkit-scrollbar-track': {
    background: '0 0',
  },
  '::selection': {
    backgroundColor: '$honghong-colors-emphasis',
    color: '$honghong-colors-brand',
  },
  hr: {
    height: 0,
    color: 'inherit',
    borderTopWidth: '1px',
  },
  'abbr:where([title])': {
    textDecoration: 'underline dotted',
  },
  'h1,h2,h3,h4,h5,h6': {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
  a: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  'b,strong': {
    fontWeight: 'bolder',
  },
  'code,kbd,samp,pre': {
    fontFamily: '$normal',
    fontSize: '1em',
  },
  small: {
    fontSize: '80%',
  },
  'sub,sup': {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline',
  },
  sub: {
    bottom: '-0.25em',
  },
  sup: {
    top: '-0.5em',
  },
  table: {
    textIndent: 0,
    borderColor: 'inherit',
    borderCollapse: 'collapse',
  },
  'button,input,optgroup,select,textarea': {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 'inherit',
    color: 'inherit',
    margin: 0,
    padding: 0,
  },
  'button,select': {
    textTransform: 'none',
  },
  "button,[type='button'],[type='reset'],[type='submit']": {
    '-webkit-appearance': 'button',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
  },
  ':-moz-focusring': {
    outline: 'auto',
  },
  ':-moz-ui-invalid': {
    boxShadow: 'none',
  },
  progress: {
    verticalAlign: 'baseline',
  },
  '::-webkit-inner-spin-button,::-webkit-outer-spin-button': {
    height: 'auto',
  },
  "[type='search']": {
    '-webkit-appearance': 'textfield',
    outlineOffset: '-2px',
  },
  '::-webkit-search-decoration': {
    '-webkit-appearance': 'none',
  },
  '::-webkit-file-upload-button': {
    '-webkit-appearance': 'button',
    font: 'inherit',
  },
  summary: {
    display: 'list-item',
  },
  'blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre': {
    margin: 0,
  },
  fieldset: {
    margin: 0,
    padding: 0,
  },
  legend: {
    padding: 0,
  },
  'ol,ul,menu': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  textarea: {
    resize: 'vertical',
  },
  'input::placeholder,textarea::placeholder': {
    opacity: 1,
    color: '#9ca3af',
  },
  'button,[role="button"]': {
    cursor: 'pointer',
  },
  ':disabled': {
    cursor: 'default',
  },
  'img,svg,video,canvas,audio,iframe,embed,object': {
    display: 'block',
    verticalAlign: 'middle',
  },
  'img,video': {
    maxWidth: '100%',
    height: 'auto',
  },
  '[hidden]': {
    display: 'none',
  },
  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  globalStyles()
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme={'system'}
        value={{
          dark: darkTheme.className,
          light: defaultTheme.className,
        }}
      >
        <Analytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

import { createStitches, createTheme, CSS as StitchesCSS } from '@stitches/react'
import type * as Stitches from '@stitches/react'

/*
 * NOTE: Font weight: 100,300,400,500,700,900
 */

const { config, css, getCssText, keyframes, styled, theme, globalCss } = createStitches({
  theme: {
    colors: {
      'base-white': '0, 0%, 100%',
      'base-black': '0, 0%, 0%',
      // Gray scale
      'base-hue-gray': '223',
      'base-gray': '$base-hue-gray, 15%',
      'palette-gray-00': '$base-gray, 100%',
      'palette-gray-01': '$base-gray, 99%',
      'palette-gray-01-5': '$base-gray, 98.5%',
      'palette-gray-02': '$base-gray, 98%',
      'palette-gray-03': '$base-gray, 97%',
      'palette-gray-05': '$base-gray, 95%',
      'palette-gray-07': '$base-gray, 93%',
      'palette-gray-08': '$base-gray, 92%',
      'palette-gray-09': '$base-gray, 91%',
      'palette-gray-10': '$base-gray, 90%',
      'palette-gray-15': '$base-gray, 85%',
      'palette-gray-20': '$base-gray, 80%',
      'palette-gray-25': '$base-gray, 75%',
      'palette-gray-30': '$base-gray, 70%',
      'palette-gray-35': '$base-gray, 65%',
      'palette-gray-40': '$base-gray, 60%',
      'palette-gray-45': '$base-gray, 55%',
      'palette-gray-50': '$base-gray, 50%',
      'palette-gray-55': '$base-gray, 45%',
      'palette-gray-60': '$base-gray, 40%',
      'palette-gray-65': '$base-gray, 35%',
      'palette-gray-70': '$base-gray, 30%',
      'palette-gray-75': '$base-gray, 25%',
      'palette-gray-80': '$base-gray, 20%',
      'palette-gray-85': '$base-gray, 15%',
      'palette-gray-88': '$base-gray, 12%',
      'palette-gray-90': '$base-gray, 10%',
      'palette-gray-95': '$base-gray, 5%',
      'palette-gray-98': '$base-gray, 2%',
      'palette-gray-100': '$base-gray, 0%',
      // Blue scale
      'base-hue': 222,
      'base-saturation': 89,
      'base-blue': '$base-hue, calc($base-saturation * 1%)',
      'palette-blue-00': '$base-blue, 100%',
      'palette-blue-05': '$base-blue, 95%',
      'palette-blue-10': '$base-blue, 90%',
      'palette-blue-12': '$base-blue, 88%',
      'palette-blue-15': '$base-blue, 85%',
      'palette-blue-20': '$base-blue, 80%',
      'palette-blue-25': '$base-blue, 75%',
      'palette-blue-30': '$base-blue, 70%',
      'palette-blue-35': '$base-blue, 65%',
      'palette-blue-40': '$base-blue, 60%',
      'palette-blue-45': '$base-blue, 55%',
      'palette-blue-50': '$base-blue, 50%',
      'palette-blue-55': '$base-blue, 45%',
      'palette-blue-60': '$base-blue, 40%',
      'palette-blue-65': '$base-blue, 35%',
      'palette-blue-70': '$base-blue, 30%',
      'palette-blue-75': '$base-blue, 25%',
      'palette-blue-80': '$base-blue, 20%',
      'palette-blue-85': '$base-blue, 15%',
      'palette-blue-90': '$base-blue, 10%',
      'palette-blue-95': '$base-blue, 5%',
      // Red scale
      'base-red': '0, 95%',
      'palette-red-05': '$base-red, 95%',
      'palette-red-10': '$base-red, 90%',
      'palette-red-15': '$base-red, 85%',
      'palette-red-20': '$base-red, 80%',
      'palette-red-25': '$base-red, 75%',
      'palette-red-30': '$base-red, 70%',
      'palette-red-35': '$base-red, 65%',
      'palette-red-40': '$base-red, 60%',
      'palette-red-45': '$base-red, 55%',
      'palette-red-50': '$base-red, 50%',
      'palette-red-55': '$base-red, 45%',
      'palette-red-60': '$base-red, 40%',
      'palette-red-65': '$base-red, 35%',
      'palette-red-70': '$base-red, 30%',
      'palette-red-75': '$base-red, 25%',
      'palette-red-80': '$base-red, 20%',
      'palette-red-85': '$base-red, 15%',
      'palette-red-90': '$base-red, 10%',
      'palette-red-95': '$base-red, 5%',
      // Orange scale
      'base-orange': '42, 100%',
      'palette-orange-05': '$base-orange, 95%',
      'palette-orange-10': '$base-orange, 90%',
      'palette-orange-15': '$base-orange, 85%',
      'palette-orange-20': '$base-orange, 80%',
      'palette-orange-25': '$base-orange, 75%',
      'palette-orange-30': '$base-orange, 70%',
      'palette-orange-35': '$base-orange, 65%',
      'palette-orange-40': '$base-orange, 60%',
      'palette-orange-45': '$base-orange, 55%',
      'palette-orange-50': '$base-orange, 50%',
      'palette-orange-55': '$base-orange, 45%',
      'palette-orange-60': '$base-orange, 40%',
      'palette-orange-65': '$base-orange, 35%',
      'palette-orange-70': '$base-orange, 30%',
      'palette-orange-75': '$base-orange, 25%',
      'palette-orange-80': '$base-orange, 20%',
      'palette-orange-85': '$base-orange, 15%',
      'palette-orange-90': '$base-orange, 10%',
      'palette-orange-95': '$base-orange, 5%',
      // Green scale
      'base-green': '160, 100%',
      'palette-green-05': '$base-green, 95%',
      'palette-green-10': '$base-green, 90%',
      'palette-green-15': '$base-green, 85%',
      'palette-green-20': '$base-green, 80%',
      'palette-green-25': '$base-green, 75%',
      'palette-green-30': '$base-green, 70%',
      'palette-green-35': '$base-green, 65%',
      'palette-green-40': '$base-green, 60%',
      'palette-green-45': '$base-green, 55%',
      'palette-green-50': '$base-green, 50%',
      'palette-green-55': '$base-green, 45%',
      'palette-green-60': '$base-green, 40%',
      'palette-green-65': '$base-green, 35%',
      'palette-green-70': '$base-green, 30%',
      'palette-green-75': '$base-green, 25%',
      'palette-green-80': '$base-green, 20%',
      'palette-green-85': '$base-green, 15%',
      'palette-green-90': '$base-green, 10%',
      'palette-green-95': '$base-green, 5%',
      // Pink scale
      'base-pink': '330, 98%',
      'palette-pink-05': '$base-pink, 95%',
      'palette-pink-10': '$base-pink, 90%',
      'palette-pink-15': '$base-pink, 85%',
      'palette-pink-20': '$base-pink, 80%',
      'palette-pink-25': '$base-pink, 75%',
      'palette-pink-30': '$base-pink, 70%',
      'palette-pink-35': '$base-pink, 65%',
      'palette-pink-40': '$base-pink, 60%',
      'palette-pink-45': '$base-pink, 55%',
      'palette-pink-50': '$base-pink, 50%',
      'palette-pink-55': '$base-pink, 45%',
      'palette-pink-60': '$base-pink, 40%',
      'palette-pink-65': '$base-pink, 35%',
      'palette-pink-70': '$base-pink, 30%',
      'palette-pink-75': '$base-pink, 25%',
      'palette-pink-80': '$base-pink, 20%',
      'palette-pink-85': '$base-pink, 15%',
      'palette-pink-90': '$base-pink, 10%',
      'palette-pink-95': '$base-pink, 5%',
      // Indigo scale
      'base-indigo': '239, 84%',
      'palette-indigo-05': '$base-indigo, 95%',
      'palette-indigo-10': '$base-indigo, 90%',
      'palette-indigo-15': '$base-indigo, 85%',
      'palette-indigo-20': '$base-indigo, 80%',
      'palette-indigo-25': '$base-indigo, 75%',
      'palette-indigo-30': '$base-indigo, 70%',
      'palette-indigo-35': '$base-indigo, 65%',
      'palette-indigo-40': '$base-indigo, 60%',
      'palette-indigo-45': '$base-indigo, 55%',
      'palette-indigo-50': '$base-indigo, 50%',
      'palette-indigo-55': '$base-indigo, 45%',
      'palette-indigo-60': '$base-indigo, 40%',
      'palette-indigo-65': '$base-indigo, 35%',
      'palette-indigo-70': '$base-indigo, 30%',
      'palette-indigo-75': '$base-indigo, 25%',
      'palette-indigo-80': '$base-indigo, 20%',
      'palette-indigo-85': '$base-indigo, 15%',
      'palette-indigo-90': '$base-indigo, 10%',
      'palette-indigo-95': '$base-indigo, 5%',
      // light
      'honghong-colors-brand': 'hsla($palette-red-35, 100%)',
      'honghong-colors-emphasis': 'hsla($palette-red-50, 5%)',
      'honghong-colors-white-in-white': 'hsla($palette-gray-05, 100%)',
      'honghong-colors-body': 'hsla($palette-gray-05, 25%)',
      'honghong-colors-body-secondary': 'hsla($palette-gray-05, 100%)',
      'honghong-colors-header': 'hsla($palette-gray-05, 40%)',
      'honghong-colors-typeface-primary': 'hsla($palette-gray-90, 100%)',
      'honghong-colors-typeface-secondary': 'hsla($palette-gray-55, 100%)',
      'honghong-colors-typeface-tertiary': 'hsla($palette-gray-60, 100%)',
      'honghong-colors-border-primary': 'hsla($palette-gray-05, 100%)',
    },
    shadows: {
      brand: '0px 0px 0px 2px $colors$honghong-colors-brand',
    },
    fonts: {
      untitled:
        "Untitled Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      normal: "'Noto Sans TC','Inter', sans-serif",
    },
    sizes: {
      'max-w-xs': '320px',
      'max-w-sm': '384px',
      'max-w-md': '448px',
      'max-w-lg': '512px',
      'max-w-xl': '576px',
      'max-w-2xl': '672px',
      'max-w-3xl': '768px',
      'max-w-4xl': '896px',
      'max-w-5xl': '1024px',
      'max-w-6xl': '1152px',
      'max-w-7xl': '1280px',
      'max-w-full': '100%',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      13: '56px',
      14: '64px',
      15: '72px',
      16: '80px',
      17: '96px',
      18: '112px',
    },
    space: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '40px',
      8: '48px',
      9: '56px',
      10: '64px',
      11: '80px',
      12: '96px',
      13: '128px',
      14: '256px',
      15: '512px',
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      '8xl': '96px',
      '9xl': '128px',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
  },
  media: {
    xs: '(min-width: 375px)',
    s: '(min-width: 475px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),

    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
      flexDirection: value,
    }),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
      alignItems: value,
    }),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
      alignContent: value,
    }),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
      justifyContent: value,
    }),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
      flexShrink: value,
    }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),

    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),

    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
      lineHeight: value,
    }),

    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),

    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value,
    }),
    us: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),

    linearGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    divideX: (value: Stitches.PropertyValue<'borderWidth'>) => ({
      '& > :not([hidden]) ~ :not([hidden])': {
        borderLeftWidth: value,
        borderColor: '$colors$honghong-colors-border-primary',
      },
    }),

    divideY: (value: Stitches.PropertyValue<'borderWidth'>) => ({
      '& > :not([hidden]) ~ :not([hidden])': {
        borderTopWidth: value,
        borderColor: '$colors$honghong-colors-border-primary',
      },
    }),

    spaceX: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      '& > :not([hidden]) ~ :not([hidden])': {
        marginLeft: value,
      },
    }),

    spaceY: (value: Stitches.PropertyValue<'marginTop'>) => ({
      '& > :not([hidden]) ~ :not([hidden])': {
        marginTop: value,
      },
    }),

    gapX: (value: Stitches.PropertyValue<'columnGap'>) => ({
      columnGap: value,
    }),

    gapY: (value: Stitches.PropertyValue<'rowGap'>) => ({
      rowGap: value,
    }),
  },
})

export const darkTheme = createTheme({
  colors: {
    // dark
    'honghong-colors-brand': 'hsla($palette-red-35, 100%)',
    'honghong-colors-emphasis': 'hsla($palette-red-35, 10%)',
    'honghong-colors-body': 'hsla($palette-gray-90, 100%)',
    'honghong-colors-body-secondary': 'hsla($palette-gray-85, 80%)',
    'honghong-colors-header': 'hsla($palette-gray-90, 40%)',
    'honghong-colors-typeface-primary': 'hsla($palette-gray-05, 100%)',
    'honghong-colors-typeface-secondary': 'hsla($palette-gray-35, 100%)',
    'honghong-colors-typeface-tertiary': 'hsla($palette-gray-20, 100%)',
    'honghong-colors-border-primary': 'hsla($palette-gray-85, 80%)',
  },
})

export const globalStyles = globalCss({
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
})

export type CSS = StitchesCSS<typeof config>
export type { VariantProps } from '@stitches/react'
export { config, css, getCssText, keyframes, styled, theme, globalCss }

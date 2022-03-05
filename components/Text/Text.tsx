import { styled } from '@/lib/stitches.config'

export const Text = styled('span', {
  // Reset
  lineHeight: '1',
  margin: '0',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
  display: 'block',

  variants: {
    size: {
      '1': {
        fontSize: '$xs',
        lineHeight: '1rem',
      },
      '2': {
        fontSize: '$sm',
        lineHeight: '1.25rem',
      },
      '3': {
        fontSize: '$base',
        lineHeight: '1.5rem',
      },
      '4': {
        fontSize: '$lg',
        lineHeight: '1.75rem',
      },
      '5': {
        fontSize: '$xl',
        letterSpacing: '-.015em',
        lineHeight: '1.75rem',
      },
      '6': {
        fontSize: '$2xl',
        letterSpacing: '-.016em',
        lineHeight: '2rem',
      },
      '7': {
        fontSize: '$3xl',
        letterSpacing: '-.031em',
        textIndent: '-.005em',
        lineHeight: '2.25rem',
      },
      '8': {
        fontSize: '$4xl',
        letterSpacing: '-.034em',
        textIndent: '-.018em',
        lineHeight: '2.25rem',
      },
      '9': {
        fontSize: '$5xl',
        letterSpacing: '-.055em',
        textIndent: '-.025em',
        lineHeight: '1',
      },
      '10': {
        fontSize: '$6xl',
        letterSpacing: '-.062em',
        textIndent: '-.032em',
        lineHeight: '1',
      },
      '11': {
        fontSize: '$7xl',
        letterSpacing: '-0.070em',
        textIndent: '-0.040em',
        lineHeight: '1',
      },
      '12': {
        fontSize: '$8xl',
        letterSpacing: '-0.078em',
        textIndent: '-0.048em',
        lineHeight: '1',
      },
      '13': {
        fontSize: '$9xl',
        letterSpacing: '-0.085em',
        textIndent: '-0.055em',
        lineHeight: '1',
      },
    },
  },
  defaultVariants: {
    size: '3',
  },
})

import { styled } from '@/lib/stitches.config'
import { motion } from 'framer-motion'

export const Button = styled('button', {
  // Reset
  inclue: ['box'],
  all: 'unset',
  alignItems: 'center',
  userSelect: 'none',
  cursor: 'pointer',

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  height: '$5',
  px: '$2',
  fontSize: '$2',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',

  '&:disabled': {
    backgroundColor: '$slate2',
    boxShadow: 'inset 0 0 0 1px $colors$slate7',
    color: '$slate8',
    pointerEvents: 'none',
  },
  variants: {
    /* 
      TODO: Add more size if I need
    */
    size: {
      '1': {
        borderRadius: '$1',
        height: '$8',
        width: '$10',
        px: '$4',
        fontSize: '$sm',
        lineHeight: '$sizes$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$10',
        width: '$12',
        px: '$4',
        fontSize: '$md',
        lineHeight: '$sizes$6',
      },
      '3': {
        borderRadius: '$2',
        height: '$12',
        width: '$14',
        px: '$4',
        fontSize: '$lg',
        lineHeight: '$sizes$7',
      },
    },
    variant: {
      red: {
        backgroundColor: '$honghong-colors-brand',
        color: 'hsla($base-white)',
        '&:hover': {
          backgroundColor: 'hsla($palette-red-40, 100%)',
        },
      },
      blue: {
        backgroundColor: 'hsla($palette-blue-45, 100%)',
        color: 'hsla($base-white)',
        '&:hover': {
          backgroundColor: 'hsla($palette-blue-40, 100%)',
        },
      },
    },
    square: {
      true: {
        width: '$8',
        height: '$8',
        p: '$1',
      },
    },
  },
  defaultVariants: {
    size: '1',
    variant: 'red',
  },
})

export const MotionButton = styled(motion.button, {})

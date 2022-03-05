import { darkTheme, styled } from '@/lib/stitches.config'
import Link from '@/components/Link'
import { motion } from 'framer-motion'

export const HeaderWrapper = styled('header', {
  position: 'sticky',
  top: '0',
  zIndex: 40,
  width: '100%',
  flex: 'none',
  '@lg': {
    zIndex: 50,
  },
  variants: {
    isTop: {
      true: {
        [`.${darkTheme} &`]: {
          backgroundColor: 'transparent',
        },
      },
      false: {
        backgroundColor: 'hsla($base-white, 0.75)',
        backdropFilter: 'blur(8px)',
        [`.${darkTheme} &`]: {
          backgroundColor: 'hsla($palette-gray-90, 0.75)',
        },
      },
    },
    navShow: {
      true: {
        backgroundColor: 'hsla($palette-gray-00, 100%)',
        backdropFilter: 'none',
        [`.${darkTheme} &`]: {
          backgroundColor: '$honghong-colors-body',
        },
      },
      false: {
        backgroundColor: 'hsla($honghong-colors-header, 100%, 0.75)',
      },
    },
  },
})

export const NavItemLink = styled(Link, {
  display: 'hidden',
  borderRadius: '8px',
  py: '4px',
  px: '8px',
  fontWeight: 500,
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
  transitionDuration: '150ms',
  '@sm': {
    display: 'inline-block',
    py: '12px',
  },
  '@md': {
    px: '16px',
  },
  '&:hover': {
    color: 'hsla($palette-red-65, 100%)',
    [`.${darkTheme} &`]: {
      color: '$honghong-colors-brand',
    },
  },
  variants: {
    isActive: {
      true: {
        color: 'hsla($palette-red-65, 100%)',
        [`.${darkTheme} &`]: {
          color: '$honghong-colors-brand',
        },
      },
      false: {
        color: '$honghong-colors-typeface-primary',
      },
    },
  },
})

export const NavItemUnderline = styled('div', {
  position: 'absolute',
  top: '100%',
  mt: '8px',
  height: '4px',
  width: '100%',
  borderRadius: '16px',
  backgroundColor: '$honghong-colors-brand',
  opacity: '0.85',
})

export const HeaderLogo = styled('svg', {
  ml: '16px',
  fill: '$honghong-colors-brand',
})

export const MotionNav = styled(motion.nav, {})

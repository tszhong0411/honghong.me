import { styled } from '@/lib/stitches.config'

export const StyledFooter = styled('footer', {
  mx: 'auto',
  mt: '2rem',
  width: '100%',
  maxWidth: '$max-w-3xl',
  px: '$6',
  '@xl': {
    px: 0,
  },
})

import { styled } from '@/lib/stitches.config'
import Link from 'next/link'

export const StyledLink = styled(Link, {
  transition: '0.3s',
  variants: {
    variant: {
      red: {
        '&:hover': {
          color: '$honghong-colors-brand',
        },
      },
    },
    underline: {
      true: {
        borderColor: 'transparent',
        borderBottomWidth: '2px',
        '&:hover': {
          borderColor: '$honghong-colors-brand',
        },
      },
    },
  },
})

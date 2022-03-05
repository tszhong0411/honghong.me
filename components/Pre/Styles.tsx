import { styled } from '@/lib/stitches.config'

export const StyledButon = styled('button', {
  position: 'absolute',
  right: '$4',
  top: '$2',
  height: '$8',
  width: '$8',
  borderRadius: '$1',
  borderWidth: '$2',
  borderColor: '$honghong-colors-border-primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    width: '$5',
    height: '$5',
  },
  variants: {
    copied: {
      true: {
        borderColor: 'hsla($palette-green-40, 100%)',
        '&:focus': {
          borderColor: 'hsla($palette-green-40, 100%)',
          outline: 'none',
        },
      },
      false: {
        borderColor: 'hsla($palette-gray-05, 100%)',
      },
    },
  },
})

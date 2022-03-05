import { styled } from '@/lib/stitches.config'

export const Input = styled('input', {
  display: 'block',
  width: '100%',
  outline: 'none',
  borderRadius: '$2',
  borderWidth: '1px',
  borderColor: 'hsla($palette-gray-05, 100%)',
  backgroundColor: 'hsla($base-white, 100%)',
  px: '$4',
  py: '$2',
  color: '$honghong-colors-typeface-primary',
  '&:focus': {
    borderColor: '$honghong-colors-brand',
    boxShadow: '$brand',
    outline: 'none',
  },
})

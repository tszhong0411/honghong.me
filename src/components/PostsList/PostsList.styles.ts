import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  image: {
    transition: 'all 0.5s',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))

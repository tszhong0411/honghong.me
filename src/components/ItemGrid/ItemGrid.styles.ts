import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  name: {
    color: `${theme.colorScheme === 'dark' ? '#fff' : '#000'} !important`,
  },

  image: {
    [theme.fn.smallerThan('sm')]: {
      maxWidth: 96,
    },
  },
}))

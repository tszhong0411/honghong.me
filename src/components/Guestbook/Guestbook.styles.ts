import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  btn: {
    width: '100%',
    maxWidth: '100%',
    [theme.fn.largerThan('sm')]: {
      maxWidth: 100,
    },
  },

  formWrapper: {
    flexDirection: 'column',
    gap: 0,
    [theme.fn.largerThan('sm')]: {
      flexDirection: 'row',
      gap: 16,
    },
  },

  avatar: {
    borderRadius: '50%',
  },
}))

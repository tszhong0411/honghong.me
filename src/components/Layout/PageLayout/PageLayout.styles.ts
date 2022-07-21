import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  layout: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    marginBottom: 24,
    fontSize: 30,
    fontWeight: 700,

    [theme.fn.largerThan('md')]: {
      fontSize: 48,
    },
  },

  description: {
    marginBottom: 48,
  },
}))

import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.fn.largerThan('sm')]: {
      width: '50%',
    },
  },

  heading: {
    marginBottom: 40,
    display: 'block',
    fontSize: 20,
    fontWeight: 500,
  },

  summary: {
    margin: '16px 0 24px 0',
  },

  title: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
    fontSize: 20,
  },
}))

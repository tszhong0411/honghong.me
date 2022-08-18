import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  footer: {
    margin: '32px auto 0 auto',
    width: '100%',
    maxWidth: 960,
    padding: '0 30px',

    [theme.fn.largerThan('sm')]: {
      padding: '0 32px',
    },
  },

  footerInner: {
    marginTop: 24,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    paddingTop: 48,
  },

  footerBottom: {
    margin: '0 auto 32px auto',
    width: '100%',
    fontWeight: 500,
  },
}))

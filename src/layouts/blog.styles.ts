import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  author: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: `1px solid ${theme.colors.red[6]}`,

    '& img': {
      borderRadius: '50%',
    },
  },

  analytics: {
    margin: '24px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    fontSize: 14,

    [theme.fn.largerThan('sm')]: {
      fontSize: 16,
    },
  },

  postBottom: {
    margin: '16px 0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
  },

  postBottomRight: {
    display: 'flex',
    gap: 8,
  },

  postBottomLeft: {
    display: 'flex',
    alignItems: 'center',
  },

  contentWrapper: {
    display: 'flex',

    '& > #blog-content': {
      width: '100%',

      [theme.fn.largerThan('lg')]: {
        width: '40em',
      },
    },
  },
}))

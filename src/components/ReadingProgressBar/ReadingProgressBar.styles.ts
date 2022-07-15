import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  wrapper: {
    display: 'none',
    height: 'calc(88vh - 40px)',
    maxHeight: 425,
    width: 2,
    backgroundColor: theme.colorScheme === 'dark' ? '#404040' : '#94a3b8',
    opacity: 0.7,
    transform: 'translateX(-14px)',
    [theme.fn.largerThan('lg')]: {
      display: 'block',
    },
  },

  inner: {
    height: '100%',
    width: 2,
    transformOrigin: 'top',
    backgroundColor: theme.colorScheme === 'dark' ? '#94a3b8' : '#334155',
  },
}))

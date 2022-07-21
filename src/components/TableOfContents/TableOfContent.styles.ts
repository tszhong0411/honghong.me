import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  wrapper: {
    minWidth: 200,
    marginLeft: 50,
    display: 'none',

    '& > #toc-container': {
      position: 'sticky',
      top: '6rem',
    },

    [theme.fn.largerThan('lg')]: {
      display: 'block',
    },
  },
}))

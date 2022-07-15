import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  logo: {
    fill: theme.colors.red[9],
    height: 34,
    '& > path:last-child': {
      fill: theme.colorScheme === 'dark' ? '#fff' : '#000',
    },
    cursor: 'pointer',
    padding: '6px 8px',
    borderRadius: 8,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

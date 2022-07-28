import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,

    '&:hover': {
      textDecoration: 'none',
    },
  },
  text: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
    lineHeight: '28px',
    fontWeight: 300,
  },
}))

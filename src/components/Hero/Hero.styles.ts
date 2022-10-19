import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  logo: {
    userSelect: 'none',
    borderRadius: '50%',
  },

  about: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    transition: 'box-shadow 0.3s ease',

    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 20px 0',
    },
  },
}))

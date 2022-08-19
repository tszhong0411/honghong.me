import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  article: {
    display: 'flex',
    flexDirection: 'column',
    gap: 50,
    margin: '0 auto',
    maxWidth: 570,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.gray[8],
    textDecoration: 'none',
    cursor: 'pointer',

    ['@media (min-width: 940px)']: {
      flexDirection: 'row',
      margin: '0',
      maxWidth: 'none',
    },
  },

  imageContainer: {
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 570,

    ['@media (min-width: 940px)']: {
      maxWidth: 300,
    },
  },

  image: {
    borderRadius: 8,
  },

  info: {
    opacity: 0.5,
    fontWeight: 800,
  },

  content: {
    maxWidth: 520,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
  },
}))

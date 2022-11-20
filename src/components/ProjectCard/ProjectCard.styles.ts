import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    height: '100%',

    '&:hover img': {
      scale: '1.1',
    },
  },

  tech: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.dark[2]
    }`,
    padding: '8px 12px',
    borderRadius: 9999,

    '& svg': {
      fill: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  image: {
    objectFit: 'cover',
    transition: 'scale 0.3s ease',
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

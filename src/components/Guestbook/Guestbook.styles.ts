import { createStyles } from '@mantine/core'

export default createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },

  btn: {
    width: '100%',
    maxWidth: '100%',
    [theme.fn.largerThan('sm')]: {
      maxWidth: 100,
    },
  },

  formWrapper: {
    flexDirection: 'column',
    gap: 0,
    [theme.fn.largerThan('sm')]: {
      flexDirection: 'row',
      gap: 16,
    },
  },

  avatar: {
    borderRadius: '50%',
  },
}))

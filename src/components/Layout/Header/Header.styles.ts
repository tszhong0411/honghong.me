import { createStyles } from '@mantine/core';

export const HEADER_HEIGHT = 60;
export const HEADER_BREAKPOINT = 860;

export default createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 50,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
    height: HEADER_HEIGHT,
    padding: '0 16px',
    maxWidth: 960,
    margin: '0 auto',
  },

  burger: {
    display: 'block',
    pointerEvents: 'all',

    [`@media (min-width: ${HEADER_BREAKPOINT}px)`]: {
      display: 'none',
    },
  },

  headerLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  headerRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  dropdown: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -10,
    height: `100vh`,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      textDecoration: 'none',
    },

    [theme.fn.largerThan('sm')]: {
      padding: '8px 12px',
    },
  },

  links: {
    display: 'none',
    [theme.fn.largerThan('md')]: {
      display: 'flex',
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

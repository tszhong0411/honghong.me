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
}));

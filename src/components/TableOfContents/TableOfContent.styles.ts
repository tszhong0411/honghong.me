import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  wrapper: {
    position: 'fixed',
    top: '50%',
    left: 30,
    display: 'flex',
  },

  toc: {
    display: 'none',
    width: 280,
    [`@media (min-width: 1536px)`]: {
      flexDirection: 'column',
      display: 'flex',
    },
  },
}));

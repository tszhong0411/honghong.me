import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    marginBottom: 32,
    display: 'flex',
    width: '100%',
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: 4,

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'row',
      gap: 8,
    },
  },

  iconWrapper: {
    display: 'flex',
    width: 24,
    height: 20,
    alignItems: 'center',
  },

  dataWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    gap: 4,
    fontSize: 12,

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'row',
    },
    '& > span': {
      margin: '0 8px',
      display: 'none',
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        display: 'block',
      },
    },
  },
}));

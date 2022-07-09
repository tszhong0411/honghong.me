import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  hero: {
    margin: '48px auto 96px auto',
    display: 'flex',
    maxWidth: 960,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoWrapper: {
    display: 'none',

    [theme.fn.largerThan('sm')]: {
      display: 'block',
    },
  },

  logo: {
    userSelect: 'none',
    borderRadius: '50%',
  },
}));

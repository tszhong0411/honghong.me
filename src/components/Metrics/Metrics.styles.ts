import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  group: {
    gap: 16,
    gridTemplateColumns: 'repeat(1, minmax(0,1fr))',
    width: '100%',
    display: 'grid',
    margin: '8px 0',

    [theme.fn.largerThan('sm')]: {
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
    },
  },
}));

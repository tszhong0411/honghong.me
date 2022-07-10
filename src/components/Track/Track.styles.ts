import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  track: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    fontSize: 14,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0 0 12px',
  },
}));

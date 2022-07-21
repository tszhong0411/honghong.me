import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.red[8],
    zIndex: 80,
  },
}))

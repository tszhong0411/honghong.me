import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  emojiWrapper: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: '18px',
  },

  emoji: {
    position: 'absolute',
    width: '100%',
  },

  firstStop: {
    stopColor: 'rgb(250, 51, 81)',
    stopOpacity: 1,
  },

  secondStop: {
    stopColor: 'rgb(255, 121, 44)',
    stopOpacity: 1,
  },

  heart: {
    fill: theme.colorScheme === 'dark' ? '#4b5563' : '#c4c1c1',
  },
}))

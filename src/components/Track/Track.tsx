import { Text, useMantineTheme } from '@mantine/core'

import Link from '@/components/Link'

import { useStyles } from './Track.styles'

export default function Track(track) {
  const { classes } = useStyles()
  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <div className={classes.track}>
      <Text
        sx={{
          fontWeight: 700,
        }}
      >
        {track.ranking}
      </Text>
      <div className={classes.content}>
        <Link
          href={track.songUrl}
          sx={{
            color: dark ? 'white' : 'black',
          }}
        >
          {track.title}
        </Link>
        <Text mb={16}>{track.artist}</Text>
      </div>
    </div>
  )
}

import { Box, Card, Text, Title, useMantineTheme } from '@mantine/core'
import Image from 'next/image'

import { useStyles } from './Hero.styles'

export default function Hero() {
  const { classes } = useStyles()
  const { colorScheme } = useMantineTheme()
  const theme = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <Card mb={96} p={32} className={classes.about} radius='lg' withBorder>
      <Box sx={{ height: 90, width: 90 }}>
        <Image
          src='/static/images/logo/logo-black.png'
          alt='Logo'
          width={3850}
          height={3850}
          className={classes.logo}
        />
      </Box>
      <Title order={1} sx={{ fontSize: 30, fontWeight: 700 }}>
        Hey, I&apos;m 小康 👋
      </Title>
      <Text
        size={18}
        weight={500}
        color={dark ? theme.colors.gray[6] : theme.colors.gray[8]}
      >
        A student who loves web development
      </Text>
    </Card>
  )
}

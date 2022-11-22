import { Box, Card, Text, Title, useMantineTheme } from '@mantine/core'
import Image from 'next/image'

import { useStyles } from './Hero.styles'

const Hero = () => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === 'dark'

  return (
    <Card mb={96} p={32} className={classes.about} radius='lg' withBorder>
      <Box sx={{ height: 90, width: 90 }}>
        <Image
          src='/static/images/logo/logo-black.png'
          alt='Logo'
          width={90}
          height={90}
          className={classes.logo}
        />
      </Box>
      <Title order={1} fz={{ base: 22, sm: 28 }} weight={700}>
        Hey, I&apos;m 小康 👋
      </Title>
      <Text
        size={18}
        weight={500}
        color={dark ? theme.colors.gray[6] : theme.colors.gray[8]}
        fz={{ base: 14, sm: 16 }}
      >
        A student who loves web development
      </Text>
    </Card>
  )
}

export default Hero

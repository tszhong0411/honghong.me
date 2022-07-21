import { Button, Tooltip, useMantineColorScheme } from '@mantine/core'
import React from 'react'
import { MoonStars, Sun } from 'tabler-icons-react'

import { useStyles } from '@/components/Layout/Header/Header.styles'

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const { classes } = useStyles()

  return (
    <Tooltip label={dark ? 'Light mode' : 'Dark mode'} openDelay={500}>
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={() => toggleColorScheme()}
      >
        {dark ? <Sun size={20} /> : <MoonStars size={20} />}
      </Button>
    </Tooltip>
  )
}

export default ThemeSwitch

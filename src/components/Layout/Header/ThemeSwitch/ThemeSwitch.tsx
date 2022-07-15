import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import React from 'react'
import { MoonStars, Sun } from 'tabler-icons-react'

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      size='lg'
      radius='md'
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
    >
      {dark ? <Sun size={20} /> : <MoonStars size={20} />}
    </ActionIcon>
  )
}

export default ThemeSwitch

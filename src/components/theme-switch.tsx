'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import React from 'react'

import { Button } from './ui'

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <Button
      variant='ghost'
      className='flex h-9 w-9 items-center justify-center p-0'
      type='button'
      aria-label='Toggle theme'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && resolvedTheme === 'dark' && <IconSun size={20} />}
      {mounted && resolvedTheme === 'light' && <IconMoon size={20} />}
    </Button>
  )
}

export default ThemeSwitch

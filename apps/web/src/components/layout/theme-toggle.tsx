import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@tszhong0411/ui'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='size-9 p-0'
          type='button'
          aria-label='Toggle theme'
          data-test-id='theme-toggle'
        >
          <span className='sr-only'>Toggle theme</span>
          <SunIcon className='size-4 dark:hidden' />
          <MoonIcon className='hidden size-4 dark:block' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('light')
          }}
          data-test-id='theme-light-button'
        >
          <SunIcon className='size-[18px]' /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('dark')
          }}
          data-test-id='theme-dark-button'
        >
          <MoonIcon className='size-[18px]' /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('system')
          }}
          data-test-id='theme-system-button'
        >
          <MonitorIcon className='size-[18px]' /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle

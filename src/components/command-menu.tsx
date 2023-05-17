'use client'

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
  IconCode,
  IconCommand,
  IconLink,
  IconMoon,
  IconSun,
} from '@tabler/icons-react'
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@tszhong0411/ui'
import { useTheme } from 'next-themes'
import React from 'react'
import toast from 'react-hot-toast'

type Groups = {
  name: string
  actions: {
    title: string
    icon: React.ReactNode
    onSelect: () => void
  }[]
}[]

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const groups: Groups = [
    {
      name: 'General',
      actions: [
        {
          title: 'Copy Link',
          icon: <IconLink size={16} className='mr-2' />,
          onSelect: () =>
            runCommand(async () => {
              if (!navigator?.clipboard) {
                toast.error('Access to clipboard rejected!')
              }

              try {
                await navigator.clipboard.writeText(window.location.href)
                toast.success(
                  <div className='flex flex-col'>
                    <div>Copied</div>
                    <div className='text-sm text-accent-5'>
                      You can now share it with anyone.
                    </div>
                  </div>
                )
              } catch {
                toast.error('Failed to copy!')
              }
            }),
        },
        {
          title: 'Source code',
          icon: <IconCode size={16} className='mr-2' />,
          onSelect: () =>
            runCommand(() =>
              window.open(
                'https://github.com/tszhong0411/honghong.me',
                '_blank'
              )
            ),
        },
      ],
    },
    {
      name: 'Social',
      actions: [
        {
          title: 'GitHub',
          icon: <IconBrandGithub size={16} className='mr-2' />,
          onSelect: () =>
            runCommand(() =>
              window.open('https://github.com/tszhong0411', '_blank')
            ),
        },
        {
          title: 'Instagram',
          icon: <IconBrandInstagram size={16} className='mr-2' />,
          onSelect: () =>
            runCommand(() =>
              window.open('https://instagram.com/tszhong0411/', '_blank')
            ),
        },
        {
          title: 'YouTube',
          icon: <IconBrandYoutube size={16} className='mr-2' />,
          onSelect: () =>
            runCommand(() =>
              window.open('https://youtube.com/@tszhong0411', '_blank')
            ),
        },
        {
          title: 'Facebook',
          icon: <IconBrandFacebook size={16} className='mr-2' />,
          onSelect: () =>
            runCommand(() =>
              window.open('https://www.facebook.com/tszhonglai.0411/', '_blank')
            ),
        },
      ],
    },
    {
      name: 'Theme',
      actions: [
        {
          title: 'Light',
          icon: <IconSun size={16} className='mr-2' />,
          onSelect: () => runCommand(() => setTheme('light')),
        },
        {
          title: 'Dark',
          icon: <IconMoon size={16} className='mr-2' />,
          onSelect: () => runCommand(() => setTheme('dark')),
        },
      ],
    },
  ]

  return (
    <>
      <Button
        variant='ghost'
        className='flex h-9 w-9 items-center justify-center p-0'
        onClick={() => setOpen(true)}
        type='button'
        aria-label='Open Command Menu'
        title='Open Command Menu'
      >
        <IconCommand size={20} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, i) => (
            <React.Fragment key={group.name}>
              <CommandGroup heading={group.name}>
                {group.actions.map((action) => (
                  <CommandItem key={action.title} onSelect={action.onSelect}>
                    {action.icon}
                    {action.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              {i !== groups.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu

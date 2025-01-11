'use client'

import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { ComponentIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState } from 'react'

import { SIDEBAR_LINKS } from '@/config/links'

const Search = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { setTheme } = useTheme()
  const router = useRouter()

  const runCommand = (command: () => void) => {
    setIsOpened(false)
    command()
  }

  return (
    <>
      <Button
        variant='outline'
        className={cn(
          'bg-muted/50 text-muted-foreground hidden h-10 items-center justify-between gap-3 rounded-lg pr-2 font-normal sm:flex lg:w-64'
        )}
        onClick={() => {
          setIsOpened(true)
        }}
      >
        <span>Search documentation</span>
        <kbd className='bg-muted flex select-none gap-1 rounded border px-1.5 font-mono text-xs font-medium'>
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='sm:hidden'
        onClick={() => {
          setIsOpened(true)
        }}
        aria-label='Search documentation'
      >
        <SearchIcon className='size-5' />
      </Button>
      <CommandDialog open={isOpened} onOpenChange={setIsOpened}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {SIDEBAR_LINKS.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.links.map((link) => (
                <CommandItem
                  key={link.href}
                  value={link.text}
                  onSelect={() => {
                    runCommand(() => {
                      router.push(link.href)
                    })
                  }}
                >
                  <ComponentIcon className='mr-3' />
                  {link.text}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem
              onSelect={() => {
                runCommand(() => {
                  setTheme('light')
                })
              }}
            >
              <SunIcon className='mr-3' />
              Light
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => {
                  setTheme('dark')
                })
              }}
            >
              <MoonIcon className='mr-3' />
              Dark
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default Search

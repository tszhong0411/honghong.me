'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/utils/cn'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { Kbd } from './kbd'

type CommandProps = React.ComponentProps<typeof CommandPrimitive>

const Command = (props: CommandProps) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive
      data-slot='command'
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...rest}
    />
  )
}

type CommandDialogProps = React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
}

const CommandDialog = (props: CommandDialogProps) => {
  const {
    title = 'Command Palette',
    description = 'Search for a command to run...',
    children,
    ...rest
  } = props

  return (
    <Dialog {...rest}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className='overflow-hidden p-0'>
        <Command
          className={cn(
            '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2',
            '[&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12',
            '[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5',
            '**:data-[slot=command-input-wrapper]:h-12'
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>

const CommandInput = (props: CommandInputProps) => {
  const { className, ...rest } = props

  return (
    <div data-slot='command-input-wrapper' className='flex h-9 items-center gap-2 border-b px-3'>
      <SearchIcon className='size-4 shrink-0 opacity-50' />
      <CommandPrimitive.Input
        data-slot='command-input'
        className={cn(
          'outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm',
          'placeholder:text-muted-foreground',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...rest}
      />
    </div>
  )
}

type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>

const CommandList = (props: CommandListProps) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.List
      data-slot='command-list'
      className={cn('max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden', className)}
      {...rest}
    />
  )
}

type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>

const CommandEmpty = (props: CommandEmptyProps) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Empty
      data-slot='command-empty'
      className={cn('py-6 text-center text-sm', className)}
      {...rest}
    />
  )
}

type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>

const CommandGroup = (props: CommandGroupProps) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Group
      data-slot='command-group'
      className={cn(
        'text-foreground overflow-hidden p-1',
        '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className
      )}
      {...rest}
    />
  )
}

type CommandSeparatorProps = React.ComponentProps<typeof CommandPrimitive.Separator>

const CommandSeparator = (props: CommandSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Separator
      data-slot='command-separator'
      className={cn('bg-border -mx-1 h-px', className)}
      {...rest}
    />
  )
}

type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>

const CommandItem = (props: CommandItemProps) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Item
      data-slot='command-item'
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...rest}
    />
  )
}

type CommandShortcutProps = React.ComponentProps<typeof Kbd>

const CommandShortcut = (props: CommandShortcutProps) => {
  const { className, ...rest } = props

  return <Kbd data-slot='command-shortcut' className={cn('ml-auto', className)} {...rest} />
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
}

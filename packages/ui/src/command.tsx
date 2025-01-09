'use client'

import { type DialogProps } from '@radix-ui/react-dialog'
import { cn } from '@tszhong0411/utils'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog'
import { VisuallyHidden } from './visually-hidden'

export const Command = (props: React.ComponentProps<typeof CommandPrimitive>) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive
      className={cn(
        'bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...rest}
    />
  )
}

type CommandDialogProps = DialogProps

export const CommandDialog = (props: CommandDialogProps) => {
  const { children, ...rest } = props

  return (
    <Dialog {...rest}>
      <DialogContent className='overflow-hidden p-0 shadow-lg'>
        <VisuallyHidden>
          <DialogTitle>Command Menu</DialogTitle>
          <DialogDescription>Search a command</DialogDescription>
        </VisuallyHidden>
        <Command
          className={cn(
            '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2',
            '[&_[cmdk-input]]:h-12',
            '[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3',
            '[&_[cmdk-item]_svg]:size-5'
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export const CommandInput = (props: React.ComponentProps<typeof CommandPrimitive.Input>) => {
  const { className, ...rest } = props

  return (
    <div className='flex items-center border-b px-3'>
      <SearchIcon className='mr-2 size-4 shrink-0 opacity-50' />
      <CommandPrimitive.Input
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
          'placeholder:text-muted-foreground',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...rest}
      />
    </div>
  )
}

export const CommandList = (props: React.ComponentProps<typeof CommandPrimitive.List>) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.List
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      {...rest}
    />
  )
}

export const CommandEmpty = (props: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  return <CommandPrimitive.Empty className='py-6 text-center text-sm' {...props} />
}

export const CommandGroup = (props: React.ComponentProps<typeof CommandPrimitive.Group>) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Group
      className={cn(
        'text-foreground overflow-hidden p-1',
        '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className
      )}
      {...rest}
    />
  )
}

export const CommandSeparator = (
  props: React.ComponentProps<typeof CommandPrimitive.Separator>
) => {
  const { className, ...rest } = props

  return <CommandPrimitive.Separator className={cn('bg-border -mx-1 h-px', className)} {...rest} />
}

export const CommandItem = (props: React.ComponentProps<typeof CommandPrimitive.Item>) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'aria-[selected=true]:bg-accent aria-[selected=true]:text-accent-foreground',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export const CommandShortcut = (props: React.ComponentProps<'span'>) => {
  const { className, ...rest } = props

  return (
    <span
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...rest}
    />
  )
}

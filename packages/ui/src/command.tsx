'use client'

import { type DialogProps } from '@radix-ui/react-dialog'
import { cn } from '@tszhong0411/utils'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import { forwardRef } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog'
import { VisuallyHidden } from './visually-hidden'

export const Command = forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...rest}
    />
  )
})

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

export const CommandInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div className='flex items-center border-b px-3'>
      <SearchIcon className='mr-2 size-4 shrink-0 opacity-50' />
      <CommandPrimitive.Input
        ref={ref}
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
})

export const CommandList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      {...rest}
    />
  )
})

export const CommandEmpty = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => {
  return <CommandPrimitive.Empty ref={ref} className='py-6 text-center text-sm' {...props} />
})

export const CommandGroup = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'text-foreground overflow-hidden p-1',
        '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className
      )}
      {...rest}
    />
  )
})

export const CommandSeparator = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('bg-border -mx-1 h-px', className)}
      {...rest}
    />
  )
})

export const CommandItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'aria-[selected=true]:bg-accent aria-[selected=true]:text-accent-foreground',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
      {...rest}
    />
  )
})

export const CommandShortcut = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <span
        ref={ref}
        className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
        {...rest}
      />
    )
  }
)

Command.displayName = CommandPrimitive.displayName
CommandInput.displayName = CommandPrimitive.Input.displayName
CommandList.displayName = CommandPrimitive.List.displayName
CommandEmpty.displayName = CommandPrimitive.Empty.displayName
CommandGroup.displayName = CommandPrimitive.Group.displayName
CommandSeparator.displayName = CommandPrimitive.Separator.displayName
CommandItem.displayName = CommandPrimitive.Item.displayName
CommandShortcut.displayName = 'CommandShortcut'

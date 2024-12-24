'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export const Select = SelectPrimitive.Root

export const SelectGroup = SelectPrimitive.Group

export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = (props: React.ComponentProps<typeof SelectPrimitive.Trigger>) => {
  const { className, children, ...rest } = props

  return (
    <SelectPrimitive.Trigger
      className={cn(
        'border-input bg-background ring-offset-background flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
        'placeholder:text-muted-foreground',
        'focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        '[&>span]:line-clamp-1',
        className
      )}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className='size-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export const SelectScrollUpButton = (
  props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
) => {
  const { className, ...rest } = props

  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...rest}
    >
      <ChevronUpIcon className='size-4' />
    </SelectPrimitive.ScrollUpButton>
  )
}

export const SelectScrollDownButton = (
  props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
) => {
  const { className, ...rest } = props

  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...rest}
    >
      <ChevronDownIcon className='size-4' />
    </SelectPrimitive.ScrollDownButton>
  )
}

export const SelectContent = (props: React.ComponentProps<typeof SelectPrimitive.Content>) => {
  const { className, children, position = 'popper', ...rest } = props

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'bg-popover text-popover-foreground relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export const SelectLabel = (props: React.ComponentProps<typeof SelectPrimitive.Label>) => {
  const { className, ...rest } = props

  return (
    <SelectPrimitive.Label
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...rest}
    />
  )
}

export const SelectItem = (props: React.ComponentProps<typeof SelectPrimitive.Item>) => {
  const { className, children, ...rest } = props

  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...rest}
    >
      <span className='absolute right-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export const SelectSeparator = (props: React.ComponentProps<typeof SelectPrimitive.Separator>) => {
  const { className, ...rest } = props

  return (
    <SelectPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} {...rest} />
  )
}

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName
SelectContent.displayName = SelectPrimitive.Content.displayName
SelectLabel.displayName = SelectPrimitive.Label.displayName
SelectItem.displayName = SelectPrimitive.Item.displayName
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

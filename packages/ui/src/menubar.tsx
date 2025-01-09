'use client'

import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react'

export const MenubarMenu = MenubarPrimitive.Menu
export const MenubarGroup = MenubarPrimitive.Group
export const MenubarPortal = MenubarPrimitive.Portal
export const MenubarSub = MenubarPrimitive.Sub
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup

type MenubarProps = React.ComponentProps<typeof MenubarPrimitive.Root>

export const Menubar = (props: MenubarProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Root
      className={cn(
        'bg-background flex h-10 items-center space-x-1 rounded-md border p-1',
        className
      )}
      {...rest}
    />
  )
}

type MenubarTriggerProps = React.ComponentProps<typeof MenubarPrimitive.Trigger>

export const MenubarTrigger = (props: MenubarTriggerProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Trigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        className
      )}
      {...rest}
    />
  )
}

type MenubarSubTriggerProps = {
  inset?: boolean
} & React.ComponentProps<typeof MenubarPrimitive.SubTrigger>

export const MenubarSubTrigger = (props: MenubarSubTriggerProps) => {
  const { className, inset, children, ...rest } = props

  return (
    <MenubarPrimitive.SubTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </MenubarPrimitive.SubTrigger>
  )
}

type MenubarSubContentProps = React.ComponentProps<typeof MenubarPrimitive.SubContent>

export const MenubarSubContent = (props: MenubarSubContentProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.SubContent
      className={cn(
        'bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        className
      )}
      {...rest}
    />
  )
}

type MenubarContentProps = React.ComponentProps<typeof MenubarPrimitive.Content>

export const MenubarContent = (props: MenubarContentProps) => {
  const { className, align = 'start', alignOffset = -4, sideOffset = 8, ...rest } = props

  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground z-50 min-w-48 overflow-hidden rounded-md border p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          className
        )}
        {...rest}
      />
    </MenubarPrimitive.Portal>
  )
}

type MenubarItemProps = { inset?: boolean } & React.ComponentProps<typeof MenubarPrimitive.Item>

export const MenubarItem = (props: MenubarItemProps) => {
  const { className, inset, ...rest } = props

  return (
    <MenubarPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  )
}

type MenubarCheckboxItemProps = React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>

export const MenubarCheckboxItem = (props: MenubarCheckboxItemProps) => {
  const { className, children, checked, ...rest } = props

  return (
    <MenubarPrimitive.CheckboxItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...rest}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

type MenubarRadioItemProps = React.ComponentProps<typeof MenubarPrimitive.RadioItem>

export const MenubarRadioItem = (props: MenubarRadioItemProps) => {
  const { className, children, ...rest } = props

  return (
    <MenubarPrimitive.RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...rest}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <DotIcon className='size-9' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

type MenubarLabelProps = { inset?: boolean } & React.ComponentProps<typeof MenubarPrimitive.Label>

export const MenubarLabel = (props: MenubarLabelProps) => {
  const { className, inset, ...rest } = props

  return (
    <MenubarPrimitive.Label
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  )
}

type MenubarSeparatorProps = React.ComponentProps<typeof MenubarPrimitive.Separator>

export const MenubarSeparator = (props: MenubarSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Separator className={cn('bg-border -mx-1 my-1 h-px', className)} {...rest} />
  )
}

type MenubarShortcutProps = React.ComponentProps<'span'>

export const MenubarShortcut = (props: MenubarShortcutProps) => {
  const { className, ...rest } = props

  return (
    <span
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...rest}
    />
  )
}

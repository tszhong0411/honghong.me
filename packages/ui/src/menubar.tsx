import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react'

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

type MenubarProps = React.ComponentProps<typeof MenubarPrimitive.Root>

const Menubar = (props: MenubarProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Root
      className={cn(
        'bg-background flex h-10 items-center space-x-1 rounded-lg border p-1',
        className
      )}
      {...rest}
    />
  )
}

type MenubarTriggerProps = React.ComponentProps<typeof MenubarPrimitive.Trigger>

const MenubarTrigger = (props: MenubarTriggerProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Trigger
      className={cn(
        'outline-hidden flex cursor-default select-none items-center rounded-md px-3 py-1.5 text-sm font-medium',
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

const MenubarSubTrigger = (props: MenubarSubTriggerProps) => {
  const { className, children, inset, ...rest } = props

  return (
    <MenubarPrimitive.SubTrigger
      className={cn(
        'outline-hidden flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm',
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

const MenubarSubContent = (props: MenubarSubContentProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.SubContent
      className={cn(
        'bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-lg border p-1 shadow-lg',
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

const MenubarContent = (props: MenubarContentProps) => {
  const { className, align = 'start', alignOffset = -4, sideOffset = 8, ...rest } = props

  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground z-50 min-w-48 overflow-hidden rounded-lg border p-1 shadow-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          className
        )}
        {...rest}
      />
    </MenubarPortal>
  )
}

type MenubarItemProps = {
  inset?: boolean
} & React.ComponentProps<typeof MenubarPrimitive.Item>

const MenubarItem = (props: MenubarItemProps) => {
  const { className, inset, ...rest } = props

  return (
    <MenubarPrimitive.Item
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  )
}

type MenubarCheckboxItemProps = React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>

const MenubarCheckboxItem = (props: MenubarCheckboxItemProps) => {
  const { className, children, checked, ...rest } = props

  return (
    <MenubarPrimitive.CheckboxItem
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
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

const MenubarRadioItem = (props: MenubarRadioItemProps) => {
  const { className, children, ...rest } = props

  return (
    <MenubarPrimitive.RadioItem
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
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

type MenubarLabelProps = {
  inset?: boolean
} & React.ComponentProps<typeof MenubarPrimitive.Label>

const MenubarLabel = (props: MenubarLabelProps) => {
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

const MenubarSeparator = (props: MenubarSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Separator className={cn('bg-border -mx-1 my-1 h-px', className)} {...rest} />
  )
}

type MenubarShortcutProps = React.ComponentProps<'span'>

const MenubarShortcut = (props: MenubarShortcutProps) => {
  const { className, ...rest } = props

  return (
    <span
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...rest}
    />
  )
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
}

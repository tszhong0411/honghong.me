import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

type MenubarProps = React.ComponentProps<typeof MenubarPrimitive.Root>

const Menubar = (props: MenubarProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Root
      data-slot='menubar'
      className={cn(
        'bg-background shadow-xs flex h-9 items-center gap-1 rounded-md border p-1',
        className
      )}
      {...rest}
    />
  )
}

type MenubarMenuProps = React.ComponentProps<typeof MenubarPrimitive.Menu>

const MenubarMenu = (props: MenubarMenuProps) => (
  <MenubarPrimitive.Menu data-slot='menubar-menu' {...props} />
)

type MenubarGroupProps = React.ComponentProps<typeof MenubarPrimitive.Group>

const MenubarGroup = (props: MenubarGroupProps) => (
  <MenubarPrimitive.Group data-slot='menubar-group' {...props} />
)

type MenubarPortalProps = React.ComponentProps<typeof MenubarPrimitive.Portal>

const MenubarPortal = (props: MenubarPortalProps) => (
  <MenubarPrimitive.Portal data-slot='menubar-portal' {...props} />
)

type MenubarRadioGroupProps = React.ComponentProps<typeof MenubarPrimitive.RadioGroup>

const MenubarRadioGroup = (props: MenubarRadioGroupProps) => (
  <MenubarPrimitive.RadioGroup data-slot='menubar-radio-group' {...props} />
)

type MenubarTriggerProps = React.ComponentProps<typeof MenubarPrimitive.Trigger>

const MenubarTrigger = (props: MenubarTriggerProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Trigger
      data-slot='menubar-trigger'
      className={cn(
        'outline-hidden flex select-none items-center rounded-sm px-2 py-1 text-sm font-medium',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
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
        data-slot='menubar-content'
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground origin-(--radix-menubar-content-transform-origin) z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md',
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

type MenubarItemProps = React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}

const MenubarItem = (props: MenubarItemProps) => {
  const { className, inset, variant = 'default', ...rest } = props

  return (
    <MenubarPrimitive.Item
      data-slot='menubar-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'dark:data-[variant=destructive]:focus:bg-destructive/20',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[inset]:pl-8',
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
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
      data-slot='menubar-checkbox-item'
      className={cn(
        'rounded-xs outline-hidden relative flex cursor-default select-none items-center gap-2 py-1.5 pl-8 pr-2 text-sm',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...rest}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon />
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
      data-slot='menubar-radio-item'
      className={cn(
        'rounded-xs outline-hidden relative flex cursor-default select-none items-center gap-2 py-1.5 pl-8 pr-2 text-sm',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

type MenubarLabelProps = React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}

const MenubarLabel = (props: MenubarLabelProps) => {
  const { className, inset, ...rest } = props

  return (
    <MenubarPrimitive.Label
      data-slot='menubar-label'
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
      {...rest}
    />
  )
}

type MenubarSeparatorProps = React.ComponentProps<typeof MenubarPrimitive.Separator>

const MenubarSeparator = (props: MenubarSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Separator
      data-slot='menubar-separator'
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...rest}
    />
  )
}

type MenubarShortcutProps = React.ComponentProps<'span'>

const MenubarShortcut = (props: MenubarShortcutProps) => {
  const { className, ...rest } = props

  return (
    <span
      data-slot='menubar-shortcut'
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...rest}
    />
  )
}

type MenubarSubProps = React.ComponentProps<typeof MenubarPrimitive.Sub>

const MenubarSub = (props: MenubarSubProps) => (
  <MenubarPrimitive.Sub data-slot='menubar-sub' {...props} />
)

type MenubarSubTriggerProps = React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}

const MenubarSubTrigger = (props: MenubarSubTriggerProps) => {
  const { className, inset, children, ...rest } = props

  return (
    <MenubarPrimitive.SubTrigger
      data-slot='menubar-sub-trigger'
      data-inset={inset}
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[inset]:pl-8',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
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
      data-slot='menubar-sub-content'
      className={cn(
        'bg-popover text-popover-foreground origin-(--radix-menubar-content-transform-origin) z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg',
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

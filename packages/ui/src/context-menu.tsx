import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

type ContextMenuProps = React.ComponentProps<typeof ContextMenuPrimitive.Root>

const ContextMenu = (props: ContextMenuProps) => (
  <ContextMenuPrimitive.Root data-slot='context-menu' {...props} />
)

type ContextMenuTriggerProps = React.ComponentProps<typeof ContextMenuPrimitive.Trigger>

const ContextMenuTrigger = (props: ContextMenuTriggerProps) => (
  <ContextMenuPrimitive.Trigger data-slot='context-menu-trigger' {...props} />
)

type ContextMenuGroupProps = React.ComponentProps<typeof ContextMenuPrimitive.Group>

const ContextMenuGroup = (props: ContextMenuGroupProps) => (
  <ContextMenuPrimitive.Group data-slot='context-menu-group' {...props} />
)

type ContextMenuPortalProps = React.ComponentProps<typeof ContextMenuPrimitive.Portal>

const ContextMenuPortal = (props: ContextMenuPortalProps) => (
  <ContextMenuPrimitive.Portal data-slot='context-menu-portal' {...props} />
)

type ContextMenuSubProps = React.ComponentProps<typeof ContextMenuPrimitive.Sub>

const ContextMenuSub = (props: ContextMenuSubProps) => (
  <ContextMenuPrimitive.Sub data-slot='context-menu-sub' {...props} />
)

type ContextMenuRadioGroupProps = React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>

const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => (
  <ContextMenuPrimitive.RadioGroup data-slot='context-menu-radio-group' {...props} />
)

type ContextMenuSubTriggerProps = React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}

const ContextMenuSubTrigger = (props: ContextMenuSubTriggerProps) => {
  const { className, inset, children, ...rest } = props

  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot='context-menu-sub-trigger'
      data-inset={inset}
      className={cn(
        'outline-hidden flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[inset]:pl-8',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </ContextMenuPrimitive.SubTrigger>
  )
}

type ContextMenuSubContentProps = React.ComponentProps<typeof ContextMenuPrimitive.SubContent>

const ContextMenuSubContent = (props: ContextMenuSubContentProps) => {
  const { className, ...rest } = props

  return (
    <ContextMenuPrimitive.SubContent
      data-slot='context-menu-sub-content'
      className={cn(
        'bg-popover text-popover-foreground origin-(--radix-context-menu-content-transform-origin) z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg',
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

type ContextMenuContentProps = React.ComponentProps<typeof ContextMenuPrimitive.Content>

const ContextMenuContent = (props: ContextMenuContentProps) => {
  const { className, ...rest } = props

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot='context-menu-content'
        className={cn(
          'bg-popover text-popover-foreground max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md',
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
    </ContextMenuPrimitive.Portal>
  )
}

type ContextMenuItemProps = React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}

const ContextMenuItem = (props: ContextMenuItemProps) => {
  const { className, inset, variant = 'default', ...rest } = props

  return (
    <ContextMenuPrimitive.Item
      data-slot='context-menu-item'
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

type ContextMenuCheckboxItemProps = React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>

const ContextMenuCheckboxItem = (props: ContextMenuCheckboxItemProps) => {
  const { className, children, checked, ...rest } = props

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot='context-menu-checkbox-item'
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm',
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
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

type ContextMenuRadioItemProps = React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>

const ContextMenuRadioItem = (props: ContextMenuRadioItemProps) => {
  const { className, children, ...rest } = props

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot='context-menu-radio-item'
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

type ContextMenuLabelProps = React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}

const ContextMenuLabel = (props: ContextMenuLabelProps) => {
  const { className, inset, ...rest } = props

  return (
    <ContextMenuPrimitive.Label
      data-slot='context-menu-label'
      data-inset={inset}
      className={cn('text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
      {...rest}
    />
  )
}

type ContextMenuSeparatorProps = React.ComponentProps<typeof ContextMenuPrimitive.Separator>

const ContextMenuSeparator = (props: ContextMenuSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <ContextMenuPrimitive.Separator
      data-slot='context-menu-separator'
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...rest}
    />
  )
}

type ContextMenuShortcutProps = React.ComponentProps<'span'>

const ContextMenuShortcut = (props: ContextMenuShortcutProps) => {
  const { className, ...rest } = props

  return (
    <span
      data-slot='context-menu-shortcut'
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...rest}
    />
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}

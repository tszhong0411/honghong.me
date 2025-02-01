import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react'

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

type ContextMenuSubTriggerProps = {
  inset?: boolean
} & React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>

const ContextMenuSubTrigger = (props: ContextMenuSubTriggerProps) => {
  const { className, children, inset, ...rest } = props

  return (
    <ContextMenuPrimitive.SubTrigger
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
    </ContextMenuPrimitive.SubTrigger>
  )
}

type ContextMenuSubContentProps = React.ComponentProps<typeof ContextMenuPrimitive.SubContent>

const ContextMenuSubContent = (props: ContextMenuSubContentProps) => {
  const { className, ...rest } = props

  return (
    <ContextMenuPrimitive.SubContent
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

type ContextMenuContentProps = React.ComponentProps<typeof ContextMenuPrimitive.Content>

const ContextMenuContent = (props: ContextMenuContentProps) => {
  const { className, ...rest } = props

  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.Content
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
    </ContextMenuPortal>
  )
}

type ContextMenuItemProps = {
  inset?: boolean
} & React.ComponentProps<typeof ContextMenuPrimitive.Item>

const ContextMenuItem = (props: ContextMenuItemProps) => {
  const { className, inset, ...rest } = props

  return (
    <ContextMenuPrimitive.Item
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

type ContextMenuCheckboxItemProps = React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>

const ContextMenuCheckboxItem = (props: ContextMenuCheckboxItemProps) => {
  const { className, children, checked, ...rest } = props

  return (
    <ContextMenuPrimitive.CheckboxItem
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
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
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
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <DotIcon className='size-9' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

type ContextMenuLabelProps = {
  inset?: boolean
} & React.ComponentProps<typeof ContextMenuPrimitive.Label>

const ContextMenuLabel = (props: ContextMenuLabelProps) => {
  const { className, inset, ...rest } = props

  return (
    <ContextMenuPrimitive.Label
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  )
}

type ContextMenuSeparatorProps = React.ComponentProps<typeof ContextMenuPrimitive.Separator>

const ContextMenuSeparator = (props: ContextMenuSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <ContextMenuPrimitive.Separator
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

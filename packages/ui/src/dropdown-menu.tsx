import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

type DropdownMenuSubTriggerProps = {
  inset?: boolean
} & React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>

const DropdownMenuSubTrigger = (props: DropdownMenuSubTriggerProps) => {
  const { className, children, inset, ...rest } = props

  return (
    <DropdownMenuPrimitive.SubTrigger
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
    </DropdownMenuPrimitive.SubTrigger>
  )
}

type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>

const DropdownMenuSubContent = (props: DropdownMenuSubContentProps) => {
  const { className, ...rest } = props

  return (
    <DropdownMenuPrimitive.SubContent
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

type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>

const DropdownMenuContent = (props: DropdownMenuContentProps) => {
  const { className, sideOffset = 4, ...rest } = props

  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
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
    </DropdownMenuPortal>
  )
}

type DropdownMenuItemProps = {
  inset?: boolean
} & React.ComponentProps<typeof DropdownMenuPrimitive.Item>

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const { className, inset, ...rest } = props

  return (
    <DropdownMenuPrimitive.Item
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

type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>

const DropdownMenuCheckboxItem = (props: DropdownMenuCheckboxItemProps) => {
  const { className, children, checked, ...rest } = props

  return (
    <DropdownMenuPrimitive.CheckboxItem
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
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

type DropdownMenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>

const DropdownMenuRadioItem = (props: DropdownMenuRadioItemProps) => {
  const { className, children, ...rest } = props

  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <DotIcon className='size-9' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

type DropdownMenuLabelProps = {
  inset?: boolean
} & React.ComponentProps<typeof DropdownMenuPrimitive.Label>

const DropdownMenuLabel = (props: DropdownMenuLabelProps) => {
  const { className, inset, ...rest } = props

  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  )
}

type DropdownMenuSeparatorProps = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>

const DropdownMenuSeparator = (props: DropdownMenuSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <DropdownMenuPrimitive.Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...rest}
    />
  )
}

type DropdownMenuShortcutProps = React.ComponentProps<'span'>

const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => {
  const { className, ...rest } = props

  return (
    <span
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...rest}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
}

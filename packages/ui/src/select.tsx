import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@tszhong0411/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value
const SelectPortal = SelectPrimitive.Portal

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger>

const SelectTrigger = (props: SelectTriggerProps) => {
  const { className, children, ...rest } = props

  return (
    <SelectPrimitive.Trigger
      className={cn(
        'border-input bg-background ring-offset-background flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm',
        'placeholder:text-muted-foreground',
        'focus:ring-ring focus:outline-hidden focus:ring-2 focus:ring-offset-2',
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

type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>

const SelectScrollUpButton = (props: SelectScrollUpButtonProps) => {
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

type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>

const SelectScrollDownButton = (props: SelectScrollDownButtonProps) => {
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

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>

const SelectContent = (props: SelectContentProps) => {
  const { className, children, position = 'popper', ...rest } = props

  return (
    <SelectPortal>
      <SelectPrimitive.Content
        className={cn(
          'bg-popover text-popover-foreground relative z-50 max-h-96 min-w-32 overflow-hidden rounded-lg border shadow-lg',
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
    </SelectPortal>
  )
}

type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>

const SelectLabel = (props: SelectLabelProps) => {
  const { className, ...rest } = props

  return (
    <SelectPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold', className)}
      {...rest}
    />
  )
}

type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>

const SelectItem = (props: SelectItemProps) => {
  const { className, children, ...rest } = props

  return (
    <SelectPrimitive.Item
      className={cn(
        'outline-hidden relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>

const SelectSeparator = (props: SelectSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <SelectPrimitive.Separator className={cn('bg-border -mx-1 my-1 h-px', className)} {...rest} />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}

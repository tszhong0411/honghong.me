import { Portal } from '@ark-ui/react'
import { type CollectionItem, Combobox as ComboboxPrimitive } from '@ark-ui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/utils/cn'

type ComboboxClearTriggerProps = React.ComponentProps<typeof ComboboxPrimitive.ClearTrigger>

const ComboboxClearTrigger = (props: ComboboxClearTriggerProps) => {
  return <ComboboxPrimitive.ClearTrigger data-slot='combobox-clear-trigger' {...props} />
}

type ComboboxItemGroupProps = React.ComponentProps<typeof ComboboxPrimitive.ItemGroup>

const ComboboxItemGroup = (props: ComboboxItemGroupProps) => {
  return <ComboboxPrimitive.ItemGroup data-slot='combobox-item-group' {...props} />
}

type ComboboxProps = React.ComponentProps<typeof ComboboxPrimitive.Root<CollectionItem>>

const Combobox = (props: ComboboxProps) => {
  const { openOnClick = true, ...rest } = props

  return <ComboboxPrimitive.Root data-slot='combobox' openOnClick={openOnClick} {...rest} />
}

type ComboboxInputProps = React.ComponentProps<typeof ComboboxPrimitive.Input>

const ComboboxInput = (props: ComboboxInputProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.Input
      data-slot='combobox-input'
      className={cn(
        'border-input dark:bg-input/30 dark:hover:bg-input/50 shadow-xs flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow]',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'placeholder:text-muted-foreground',
        className
      )}
      {...rest}
    />
  )
}

type ComboboxLabelProps = React.ComponentProps<typeof ComboboxPrimitive.Label>

const ComboboxLabel = (props: ComboboxLabelProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.Label
      data-slot='combobox-label'
      className={cn('text-sm font-medium leading-none', className)}
      {...rest}
    />
  )
}

type ComboboxTriggerProps = React.ComponentProps<typeof ComboboxPrimitive.Trigger>

const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const { children, className, ...rest } = props

  return (
    <ComboboxPrimitive.Control data-slot='combobox-control' className='relative'>
      {children}
      <ComboboxPrimitive.Trigger
        data-slot='combobox-trigger'
        className={cn('absolute right-3 top-0 h-full', className)}
        {...rest}
      >
        <ChevronsUpDownIcon className='size-4 opacity-50' />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.Control>
  )
}

type ComboboxContentProps = React.ComponentProps<typeof ComboboxPrimitive.Content>

const ComboboxContent = (props: ComboboxContentProps) => {
  const { className, ...rest } = props

  return (
    <Portal>
      <ComboboxPrimitive.Positioner>
        <ComboboxPrimitive.Content
          data-slot='combobox-content'
          className={cn(
            'bg-popover text-popover-foreground z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className
          )}
          {...rest}
        />
      </ComboboxPrimitive.Positioner>
    </Portal>
  )
}

type ComboboxItemGroupLabelProps = React.ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>

const ComboboxItemGroupLabel = (props: ComboboxItemGroupLabelProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.ItemGroupLabel
      data-slot='combobox-item-group-label'
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...rest}
    />
  )
}

type ComboboxItemProps = React.ComponentProps<typeof ComboboxPrimitive.Item>

const ComboboxItem = (props: ComboboxItemProps) => {
  const { className, children, ...rest } = props

  return (
    <ComboboxPrimitive.Item
      data-slot='combobox-item'
      className={cn(
        'outline-hidden relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <span className='absolute right-2 flex size-3.5 items-center justify-center'>
        <ComboboxPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </ComboboxPrimitive.ItemIndicator>
      </span>
      <ComboboxPrimitive.ItemText>{children}</ComboboxPrimitive.ItemText>
    </ComboboxPrimitive.Item>
  )
}

export {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxTrigger
}

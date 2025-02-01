import { Portal } from '@ark-ui/react'
import { Combobox as ComboboxPrimitive } from '@ark-ui/react/combobox'
import { cn } from '@tszhong0411/utils'

const ComboboxContext = ComboboxPrimitive.Context
const ComboboxItemContext = ComboboxPrimitive.ItemContext
const ComboboxControl = ComboboxPrimitive.Control
const ComboboxItemText = ComboboxPrimitive.ItemText
const ComboboxItemIndicator = ComboboxPrimitive.ItemIndicator
const ComboboxTrigger = ComboboxPrimitive.Trigger
const ComboboxClearTrigger = ComboboxPrimitive.ClearTrigger
const ComboboxList = ComboboxPrimitive.List
const ComboboxItemGroup = ComboboxPrimitive.ItemGroup
const ComboboxPositioner = ComboboxPrimitive.Positioner
const ComboboxPortal = Portal

type ComboboxHighlightChangeDetails = ComboboxPrimitive.HighlightChangeDetails
type ComboboxInputValueChangeDetails = ComboboxPrimitive.InputValueChangeDetails
type ComboboxOpenChangeDetails = ComboboxPrimitive.OpenChangeDetails
type ComboboxValueChangeDetails = ComboboxPrimitive.ValueChangeDetails

type ComboboxProps = React.ComponentProps<typeof ComboboxPrimitive.Root>

const Combobox = (props: ComboboxProps) => {
  const { openOnClick = true, ...rest } = props

  return <ComboboxPrimitive.Root openOnClick={openOnClick} {...rest} />
}

type ComboboxInputProps = React.ComponentProps<typeof ComboboxPrimitive.Input>

const ComboboxInput = (props: ComboboxInputProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.Input
      className={cn(
        'border-input bg-background ring-offset-background flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
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
      className={cn('text-sm font-medium leading-none', className)}
      {...rest}
    />
  )
}

type ComboboxContentProps = React.ComponentProps<typeof ComboboxPrimitive.Content>

const ComboboxContent = (props: ComboboxContentProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.Content
      className={cn(
        'bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-lg border p-1 shadow-lg',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className
      )}
      {...rest}
    />
  )
}

type ComboboxItemGroupLabelProps = React.ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>

const ComboboxItemGroupLabel = (props: ComboboxItemGroupLabelProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.ItemGroupLabel
      className={cn('px-2 py-1.5 text-sm font-semibold', className)}
      {...rest}
    />
  )
}

type ComboboxItemProps = React.ComponentProps<typeof ComboboxPrimitive.Item>

const ComboboxItem = (props: ComboboxItemProps) => {
  const { className, ...rest } = props

  return (
    <ComboboxPrimitive.Item
      className={cn(
        'outline-hidden relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm transition-colors',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  type ComboboxHighlightChangeDetails,
  ComboboxInput,
  type ComboboxInputValueChangeDetails,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  type ComboboxOpenChangeDetails,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxValueChangeDetails
}
export { createListCollection } from '@ark-ui/react/combobox'

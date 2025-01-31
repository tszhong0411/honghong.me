import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'cva'
import { XIcon } from 'lucide-react'

const sheetVariants = cva({
  base: [
    'bg-background fixed z-50 p-6 shadow-lg transition ease-in-out',
    'data-[state=open]:animate-in data-[state=open]:duration-500',
    'data-[state=closed]:animate-out data-[state=closed]:duration-300'
  ],
  variants: {
    side: {
      top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
      bottom:
        'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
      left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right:
        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm'
    }
  },
  defaultVariants: {
    side: 'right'
  }
})

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetPortal = SheetPrimitive.Portal
const SheetClose = SheetPrimitive.Close

type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>

const SheetOverlay = (props: SheetOverlayProps) => {
  const { className, ...rest } = props

  return (
    <SheetPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/40',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...rest}
    />
  )
}

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants>

const SheetContent = (props: SheetContentProps) => {
  const { side = 'right', className, children, ...rest } = props

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content className={cn(sheetVariants({ side }), className)} {...rest}>
        {children}
        <SheetPrimitive.Close
          className={cn(
            'ring-offset-background rounded-xs absolute right-4 top-4 opacity-70 transition-opacity',
            'hover:opacity-100',
            'focus:ring-ring focus:outline-hidden focus:ring-2 focus:ring-offset-2',
            'disabled:pointer-events-none'
          )}
          aria-label='Close'
        >
          <XIcon className='size-4' aria-hidden='true' />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

type SheetHeaderProps = React.ComponentProps<'div'>

const SheetHeader = (props: SheetHeaderProps) => {
  const { className, ...rest } = props

  return <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...rest} />
}

type SheetFooterProps = React.ComponentProps<'div'>

const SheetFooter = (props: SheetFooterProps) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...rest}
    />
  )
}

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>

const SheetTitle = (props: SheetTitleProps) => {
  const { className, ...rest } = props

  return (
    <SheetPrimitive.Title
      className={cn('text-foreground text-lg font-semibold', className)}
      {...rest}
    />
  )
}

type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>

const SheetDescription = (props: SheetDescriptionProps) => {
  const { className, ...rest } = props

  return (
    <SheetPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  sheetVariants
}

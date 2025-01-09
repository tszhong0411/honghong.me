'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@tszhong0411/utils'
import { XIcon } from 'lucide-react'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = (props: React.ComponentProps<typeof DialogPrimitive.Overlay>) => {
  const { className, ...rest } = props

  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...rest}
    />
  )
}

export const DialogContent = (props: React.ComponentProps<typeof DialogPrimitive.Content>) => {
  const { className, children, ...rest } = props

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'bg-background fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-lg sm:rounded-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          className
        )}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            'ring-offset-background absolute right-4 top-4 rounded-sm opacity-70 transition-opacity',
            'hover:opacity-100',
            'focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:pointer-events-none',
            'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
          )}
        >
          <span className='sr-only'>Close</span>
          <XIcon className='size-4' />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export const DialogHeader = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return (
    <div className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...rest} />
  )
}

export const DialogFooter = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...rest}
    />
  )
}

export const DialogTitle = (props: React.ComponentProps<typeof DialogPrimitive.Title>) => {
  const { className, ...rest } = props

  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...rest}
    />
  )
}

export const DialogDescription = (
  props: React.ComponentProps<typeof DialogPrimitive.Description>
) => {
  const { className, ...rest } = props

  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

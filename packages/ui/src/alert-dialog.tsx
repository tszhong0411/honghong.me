'use client'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@tszhong0411/utils'

import { buttonVariants } from './button'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = (props: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Overlay
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

export const AlertDialogContent = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Content>
) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'bg-background fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-lg sm:rounded-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          className
        )}
        {...rest}
      />
    </AlertDialogPortal>
  )
}

export const AlertDialogHeader = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...rest} />
}

export const AlertDialogFooter = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...rest}
    />
  )
}

export const AlertDialogTitle = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Title>
) => {
  const { className, ...rest } = props

  return <AlertDialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...rest} />
}

export const AlertDialogDescription = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Description>
) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

export const AlertDialogAction = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Action>
) => {
  const { className, ...rest } = props

  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...rest} />
}

export const AlertDialogCancel = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>
) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
      {...rest}
    />
  )
}

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName
AlertDialogHeader.displayName = 'AlertDialogHeader'
AlertDialogFooter.displayName = 'AlertDialogFooter'
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

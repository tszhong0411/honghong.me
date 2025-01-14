'use client'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@tszhong0411/utils'

import { buttonVariants } from './button'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal

type AlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogPrimitive.Overlay>

export const AlertDialogOverlay = (props: AlertDialogOverlayProps) => {
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

type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content>

export const AlertDialogContent = (props: AlertDialogContentProps) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'bg-background fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          className
        )}
        {...rest}
      />
    </AlertDialogPortal>
  )
}

type AlertDialogHeaderProps = React.ComponentProps<'div'>

export const AlertDialogHeader = (props: AlertDialogHeaderProps) => {
  const { className, ...rest } = props

  return <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...rest} />
}

type AlertDialogFooterProps = React.ComponentProps<'div'>

export const AlertDialogFooter = (props: AlertDialogFooterProps) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...rest}
    />
  )
}

type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>

export const AlertDialogTitle = (props: AlertDialogTitleProps) => {
  const { className, ...rest } = props

  return <AlertDialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...rest} />
}

type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>

export const AlertDialogDescription = (props: AlertDialogDescriptionProps) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action>

export const AlertDialogAction = (props: AlertDialogActionProps) => {
  const { className, ...rest } = props

  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...rest} />
}

type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel>

export const AlertDialogCancel = (props: AlertDialogCancelProps) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...rest}
    />
  )
}

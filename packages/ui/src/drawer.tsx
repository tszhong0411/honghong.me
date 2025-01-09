'use client'

import { cn } from '@tszhong0411/utils'
import { Drawer as DrawerPrimitive } from 'vaul'

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>

export const Drawer = (props: DrawerProps) => {
  const { shouldScaleBackground = true, ...rest } = props

  return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...rest} />
}

export const DrawerTrigger = DrawerPrimitive.Trigger
export const DrawerPortal = DrawerPrimitive.Portal
export const DrawerClose = DrawerPrimitive.Close

type DrawerOverlayProps = React.ComponentProps<typeof DrawerPrimitive.Overlay>

export const DrawerOverlay = (props: DrawerOverlayProps) => {
  const { className, ...rest } = props

  return (
    <DrawerPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...rest}
    />
  )
}

type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content>

export const DrawerContent = (props: DrawerContentProps) => {
  const { className, children, ...rest } = props

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          'bg-background fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border',
          className
        )}
        {...rest}
      >
        <div className='bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

type DrawerHeaderProps = React.ComponentProps<'div'>

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const { className, ...rest } = props

  return <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...rest} />
}

type DrawerFooterProps = React.ComponentProps<'div'>

export const DrawerFooter = (props: DrawerFooterProps) => {
  const { className, ...rest } = props

  return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...rest} />
}

type DrawerTitleProps = React.ComponentProps<typeof DrawerPrimitive.Title>

export const DrawerTitle = (props: DrawerTitleProps) => {
  const { className, ...rest } = props

  return (
    <DrawerPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...rest}
    />
  )
}

type DrawerDescriptionProps = React.ComponentProps<typeof DrawerPrimitive.Description>

export const DrawerDescription = (props: DrawerDescriptionProps) => {
  const { className, ...rest } = props

  return (
    <DrawerPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

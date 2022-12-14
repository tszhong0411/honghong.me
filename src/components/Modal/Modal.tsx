'use client'

import * as DialogPrimitives from '@radix-ui/react-dialog'
import React from 'react'

const Modal = (props: DialogPrimitives.DialogProps) => (
  <DialogPrimitives.Root {...props} />
)

Modal.Trigger = (props: DialogPrimitives.DialogTriggerProps) => {
  const { children, ...rest } = props

  return (
    <DialogPrimitives.Trigger asChild={typeof children !== 'string'} {...rest}>
      {children}
    </DialogPrimitives.Trigger>
  )
}

Modal.Content = (props: DialogPrimitives.DialogContentProps) => {
  const { children, ...rest } = props

  return (
    <DialogPrimitives.Portal>
      <DialogPrimitives.Overlay className='animate-in fade-in fixed inset-0 z-40 bg-black/50 opacity-100 transition-opacity' />
      <DialogPrimitives.Content
        className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-accent-2 bg-accent-1 p-4'
        {...rest}
      >
        {children}
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  )
}

Modal.Title = (props: DialogPrimitives.DialogTitleProps) => {
  const { children, ...rest } = props

  return <DialogPrimitives.Title {...rest}>{children}</DialogPrimitives.Title>
}

Modal.Description = (props: DialogPrimitives.DialogDescriptionProps) => {
  const { children, ...rest } = props

  return (
    <DialogPrimitives.Description {...rest}>
      {children}
    </DialogPrimitives.Description>
  )
}

Modal.Close = (props: DialogPrimitives.DialogCloseProps) => {
  const { children, ...rest } = props

  return (
    <DialogPrimitives.Close asChild={typeof children !== 'string'} {...rest}>
      {children}
    </DialogPrimitives.Close>
  )
}

export default Modal

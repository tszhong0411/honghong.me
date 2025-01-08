'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@tszhong0411/utils'
import { ChevronDownIcon } from 'lucide-react'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = (props: React.ComponentProps<typeof AccordionPrimitive.Item>) => {
  const { className, ...rest } = props

  return <AccordionPrimitive.Item className={cn('border-b', className)} {...rest} />
}

export const AccordionTrigger = (
  props: React.ComponentProps<typeof AccordionPrimitive.Trigger>
) => {
  const { className, children, ...rest } = props

  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...rest}
      >
        {children}
        <ChevronDownIcon className='text-muted-foreground size-4 shrink-0 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export const AccordionContent = (
  props: React.ComponentProps<typeof AccordionPrimitive.Content>
) => {
  const { className, children, ...rest } = props

  return (
    <AccordionPrimitive.Content
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
      {...rest}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@tszhong0411/utils'
import { ChevronDownIcon } from 'lucide-react'

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>

const Accordion = (props: AccordionProps) => (
  <AccordionPrimitive.Root data-slot='accordion' {...props} />
)

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>

const AccordionItem = (props: AccordionItemProps) => {
  const { className, ...rest } = props

  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn('border-b last:border-b-0', className)}
      {...rest}
    />
  )
}

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger>

const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { className, children, ...rest } = props

  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all',
          'hover:underline',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'disabled:pointer-events-none disabled:opacity-50',
          '[&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...rest}
      >
        {children}
        <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>

const AccordionContent = (props: AccordionContentProps) => {
  const { className, children, ...rest } = props

  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className={cn(
        'overflow-hidden text-sm',
        'data-[state=open]:animate-accordion-down',
        'data-[state=closed]:animate-accordion-up'
      )}
      {...rest}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

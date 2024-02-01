'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import React from 'react'

import cn from '@/utils/cn'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'bg-muted inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground',
        className
      )}
      {...rest}
    />
  )
})

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        className
      )}
      {...rest}
    />
  )
})

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    />
  )
})

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
TabsList.displayName = TabsPrimitive.List.displayName
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }

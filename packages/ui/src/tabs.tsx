'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@tszhong0411/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = (props: React.ComponentProps<typeof TabsPrimitive.List>) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.List
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1',
        className
      )}
      {...rest}
    />
  )
}

export const TabsTrigger = (props: React.ComponentProps<typeof TabsPrimitive.Trigger>) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.Trigger
      className={cn(
        'ring-offset-background inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        className
      )}
      {...rest}
    />
  )
}

export const TabsContent = (props: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.Content
      className={cn(
        'ring-offset-background mt-2',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    />
  )
}

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
TabsList.displayName = TabsPrimitive.List.displayName
TabsContent.displayName = TabsPrimitive.Content.displayName

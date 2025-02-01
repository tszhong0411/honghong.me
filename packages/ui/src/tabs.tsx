import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@tszhong0411/utils'

const Tabs = TabsPrimitive.Root

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>

const TabsList = (props: TabsListProps) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.List
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-lg p-1',
        className
      )}
      {...rest}
    />
  )
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>

const TabsTrigger = (props: TabsTriggerProps) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.Trigger
      className={cn(
        'ring-offset-background inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs',
        className
      )}
      {...rest}
    />
  )
}

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

const TabsContent = (props: TabsContentProps) => {
  const { className, ...rest } = props

  return (
    <TabsPrimitive.Content
      className={cn(
        'ring-offset-background mt-2',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }

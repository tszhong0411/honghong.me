import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@tszhong0411/utils'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

type NavigationMenuProps = React.ComponentProps<typeof NavigationMenuPrimitive.Root>

export const NavigationMenu = (props: NavigationMenuProps) => {
  const { className, children, ...rest } = props

  return (
    <NavigationMenuPrimitive.Root
      className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      {...rest}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

type NavigationMenuListProps = React.ComponentProps<typeof NavigationMenuPrimitive.List>

export const NavigationMenuList = (props: NavigationMenuListProps) => {
  const { className, ...rest } = props

  return (
    <NavigationMenuPrimitive.List
      className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
      {...rest}
    />
  )
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item

export const navigationMenuTriggerStyle = cva(
  'bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50'
)

type NavigationMenuTriggerProps = React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>

export const NavigationMenuTrigger = (props: NavigationMenuTriggerProps) => {
  const { className, children, ...rest } = props

  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...rest}
    >
      {children}
      <ChevronDownIcon
        className='relative top-px ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180'
        aria-hidden='true'
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

type NavigationMenuContentProps = React.ComponentProps<typeof NavigationMenuPrimitive.Content>

export const NavigationMenuContent = (props: NavigationMenuContentProps) => {
  const { className, ...rest } = props

  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 w-full md:absolute md:w-auto',
        className
      )}
      {...rest}
    />
  )
}

export const NavigationMenuLink = NavigationMenuPrimitive.Link

type NavigationMenuViewportProps = React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>

export const NavigationMenuViewport = (props: NavigationMenuViewportProps) => {
  const { className, ...rest } = props

  return (
    <div className={cn('absolute left-0 top-full flex justify-center')}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-lg duration-200 md:w-[var(--radix-navigation-menu-viewport-width)]',
          className
        )}
        {...rest}
      />
    </div>
  )
}

type NavigationMenuIndicatorProps = React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>

export const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  const { className, ...rest } = props

  return (
    <NavigationMenuPrimitive.Indicator
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className='bg-border relative top-[60%] size-2 rotate-45 rounded-tl-sm shadow-md' />
    </NavigationMenuPrimitive.Indicator>
  )
}

'use client'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { Button } from './button'
import { useIsMobile } from './hooks/use-is-mobile'
import { Input } from './input'
import { Separator } from './separator'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from './sheet'
import { Skeleton } from './skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { VisuallyHidden } from './visually-hidden'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContext = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContext | null>(null)

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

type SidebarProviderProps = {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
} & React.ComponentProps<'div'>

export const SidebarProvider = (props: SidebarProviderProps) => {
  const {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...rest
  } = props

  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  // eslint-disable-next-line @eslint-react/naming-convention/use-state -- internal state
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      // eslint-disable-next-line unicorn/no-document-cookie -- it's safe
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen((prev) => !prev)
    }
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full',
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  )
}

type SidebarProps = {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
} & React.ComponentProps<'div'>

export const Sidebar = (props: SidebarProps) => {
  const {
    side = 'left',
    variant = 'sidebar',
    collapsible = 'offcanvas',
    className,
    children,
    ref,
    ...rest
  } = props
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col',
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar='sidebar'
          data-mobile='true'
          className='bg-sidebar text-sidebar-foreground w-[--sidebar-width] p-0 [&>button]:hidden'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side={side}
        >
          <VisuallyHidden>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Navigation menu</SheetDescription>
          </VisuallyHidden>
          <div className='flex size-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      ref={ref}
      className='text-sidebar-foreground group peer hidden md:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow'
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type SidebarTriggerProps = React.ComponentProps<typeof Button>

export const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { className, onClick, ...rest } = props
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar='trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...rest}
    >
      <span className='sr-only'>Toggle Sidebar</span>
      <PanelLeftIcon className='size-4' />
    </Button>
  )
}

type SidebarRailProps = React.ComponentProps<'button'>

export const SidebarRail = (props: SidebarRailProps) => {
  const { className, ...rest } = props
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar='rail'
      aria-label='Toggle Sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      title='Toggle Sidebar'
      type='button'
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
        '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...rest}
    />
  )
}

type SidebarInsetProps = React.ComponentProps<'main'>

export const SidebarInset = (props: SidebarInsetProps) => {
  const { className, ...rest } = props

  return (
    <main
      className={cn(
        'bg-background relative flex min-h-svh flex-1 flex-col',
        'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
        className
      )}
      {...rest}
    />
  )
}

type SidebarInputProps = React.ComponentProps<typeof Input>

export const SidebarInput = (props: SidebarInputProps) => {
  const { className, ...rest } = props

  return (
    <Input
      data-sidebar='input'
      className={cn(
        'bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2',
        className
      )}
      {...rest}
    />
  )
}

type SidebarHeaderProps = React.ComponentProps<'div'>

export const SidebarHeader = (props: SidebarHeaderProps) => {
  const { className, ...rest } = props

  return (
    <div data-sidebar='header' className={cn('flex flex-col gap-2 p-2', className)} {...rest} />
  )
}

type SidebarFooterProps = React.ComponentProps<'div'>

export const SidebarFooter = (props: SidebarFooterProps) => {
  const { className, ...rest } = props

  return (
    <div data-sidebar='footer' className={cn('flex flex-col gap-2 p-2', className)} {...rest} />
  )
}

type SidebarSeparatorProps = React.ComponentProps<typeof Separator>

export const SidebarSeparator = (props: SidebarSeparatorProps) => {
  const { className, ...rest } = props

  return (
    <Separator
      data-sidebar='separator'
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...rest}
    />
  )
}

type SidebarContentProps = React.ComponentProps<'div'>

export const SidebarContent = (props: SidebarContentProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarGroupProps = React.ComponentProps<'div'>

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...rest}
    />
  )
}

type SidebarGroupLabelProps = {
  asChild?: boolean
} & React.ComponentProps<'div'>

export const SidebarGroupLabel = (props: SidebarGroupLabelProps) => {
  const { className, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-sidebar='group-label'
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...rest}
    />
  )
}

type SidebarGroupActionProps = {
  asChild?: boolean
} & React.ComponentProps<'button'>

export const SidebarGroupAction = (props: SidebarGroupActionProps) => {
  const { className, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-sidebar='group-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarGroupContentProps = React.ComponentProps<'div'>

export const SidebarGroupContent = (props: SidebarGroupContentProps) => {
  const { className, ...rest } = props

  return <div data-sidebar='group-content' className={cn('w-full text-sm', className)} {...rest} />
}

type SidebarMenuProps = React.ComponentProps<'ul'>

export const SidebarMenu = (props: SidebarMenuProps) => {
  const { className, ...rest } = props

  return (
    <ul
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...rest}
    />
  )
}

type SidebarMenuItemProps = React.ComponentProps<'li'>

export const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const { className, ...rest } = props

  return (
    <li data-sidebar='menu-item' className={cn('group/menu-item relative', className)} {...rest} />
  )
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type SidebarMenuButtonProps = {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & React.ComponentProps<'button'> &
  VariantProps<typeof sidebarMenuButtonVariants>

export const SidebarMenuButton = (props: SidebarMenuButtonProps) => {
  const {
    asChild = false,
    isActive = false,
    variant = 'default',
    size = 'default',
    tooltip,
    className,
    ...rest
  } = props
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()
  let tooltipState = tooltip

  const button = (
    <Comp
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...rest}
    />
  )

  if (!tooltipState) {
    return button
  }

  if (typeof tooltipState === 'string') {
    tooltipState = {
      children: tooltipState
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipState}
      />
    </Tooltip>
  )
}

type SidebarMenuActionProps = {
  asChild?: boolean
  showOnHover?: boolean
} & React.ComponentProps<'button'>

export const SidebarMenuAction = (props: SidebarMenuActionProps) => {
  const { className, asChild = false, showOnHover = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-sidebar='menu-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className
      )}
      {...rest}
    />
  )
}

type SidebarMenuIconProps = React.ComponentProps<'div'>

export const SidebarMenuBadge = (props: SidebarMenuIconProps) => {
  const { className, ...rest } = props

  return (
    <div
      data-sidebar='menu-badge'
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarMenuSkeletonProps = {
  showIcon?: boolean
} & React.ComponentProps<'div'>

export const SidebarMenuSkeleton = (props: SidebarMenuSkeletonProps) => {
  const { className, showIcon = false, ...rest } = props

  // Random width between 50 to 90%.
  // eslint-disable-next-line sonarjs/pseudo-random -- safe
  const width = `${Math.floor(Math.random() * 40) + 50}%`

  return (
    <div
      data-sidebar='menu-skeleton'
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...rest}
    >
      {showIcon && <Skeleton className='size-4 rounded-md' data-sidebar='menu-skeleton-icon' />}
      <Skeleton
        className='h-4 max-w-[--skeleton-width] flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width
          } as React.CSSProperties
        }
      />
    </div>
  )
}

type SidebarMenuSubProps = React.ComponentProps<'ul'>

export const SidebarMenuSub = (props: SidebarMenuSubProps) => {
  const { className, ...rest } = props

  return (
    <ul
      data-sidebar='menu-sub'
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

type SidebarMenuSubItemProps = React.ComponentProps<'li'>

export const SidebarMenuSubItem = (props: SidebarMenuSubItemProps) => <li {...props} />

type SidebarMenuSubButtonProps = {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
} & React.ComponentProps<'a'>

export const SidebarMenuSubButton = (props: SidebarMenuSubButtonProps) => {
  const { asChild = false, size = 'md', isActive, className, ...rest } = props

  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  )
}

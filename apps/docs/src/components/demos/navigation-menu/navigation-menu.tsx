'use client'

import {
  Logo,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerVariants
} from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import Link from 'next/link'

const components: Array<{ title: string; href: string; description: string }> = [
  {
    title: 'Alert Dialog',
    href: '/ui/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.'
  },
  {
    title: 'Hover Card',
    href: '/ui/hover-card',
    description: 'For sighted users to preview content available behind a link.'
  },
  {
    title: 'Progress',
    href: '/ui/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
  },
  {
    title: 'Scroll-area',
    href: '/ui/scroll-area',
    description: 'Visually or semantically separates content.'
  },
  {
    title: 'Tabs',
    href: '/ui/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
  },
  {
    title: 'Tooltip',
    href: '/ui/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
  }
]

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    className='from-muted/50 to-muted bg-linear-to-b outline-hidden flex size-full select-none flex-col justify-end rounded-md p-6 no-underline focus:shadow-md'
                    href='/'
                  >
                    <Logo className='size-6' />
                    <div className='mb-2 mt-4 text-lg font-medium'>tszhong0411/ui</div>
                    <p className='text-muted-foreground text-sm leading-tight'>
                      A modern component library.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href='/introduction' title='Introduction'>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerVariants()} asChild>
            <Link href='/introduction'>Introduction</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type ListItemProps = React.ComponentProps<typeof Link>

const ListItem = (props: ListItemProps) => {
  const { className, title, children, ...rest } = props

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-hidden block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors',
            className
          )}
          {...rest}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default NavigationMenuDemo

import type { Route } from 'next'

export type DropdownItemType = {
  icon: React.ReactNode
  href: Route | URL
  text: string
}

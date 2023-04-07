import type { Route } from 'next'

type Link = {
  href: Route | URL
  title: string
}

type FooterLink = {
  id: number
  links: Link[]
}

export type FooterLinks = FooterLink[]

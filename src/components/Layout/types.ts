import { defaultMeta } from '@/components/Layout/Layout'

export type Favicons = {
  rel: string
  href: string
  sizes?: string
  type?: string
}

export type SeoProps = {
  description?: string
  templateTitle?: string
  summary?: string
  date?: string
  lastmod?: string
  children: React.ReactNode
} & Partial<typeof defaultMeta>

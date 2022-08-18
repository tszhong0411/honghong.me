export type HeadingScrollSpy = {
  id: string
  level: number
  text: string
}[]

export type TableOfContentsProps = {
  toc?: HeadingScrollSpy
  activeSection: string | null
  minLevel: number
}

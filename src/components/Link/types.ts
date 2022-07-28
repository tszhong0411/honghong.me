export type TOCLinkProps = {
  id: string
  level: number
  minLevel: number
  text: string
  activeSection: string | null
}

export type CustomLinkProps = {
  noIcon?: boolean
}

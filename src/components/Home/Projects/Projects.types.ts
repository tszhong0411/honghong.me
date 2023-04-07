type Techstack = {
  icon: React.ReactNode
  label: string
}

type Project = {
  name: string
  description: string
  href: string
  homepage?: string
  image: string
  icon: React.ReactNode
  techstack: Techstack[]
  repo: string
}

export type ProjectItems = Project[]

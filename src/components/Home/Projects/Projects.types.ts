type Badge = {
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
  badges: Badge[]
  repoName: string
}

export type ProjectItems = Project[]

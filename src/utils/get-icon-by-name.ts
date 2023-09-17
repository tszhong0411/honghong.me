import {
  type Icon,
  IconBook2,
  IconBrandNextjs,
  IconBrandPlanetscale,
  IconBrandPrisma,
  IconBrandTailwind,
  IconBrandTypescript,
  IconChecks,
  IconDatabase,
  IconFriends,
  IconLink,
  IconMarkdown,
  IconPencil,
  IconPhoto,
  IconTools
} from '@tabler/icons-react'

const getIconByName = (name: string): Icon => {
  switch (name) {
    case 'Typescript': {
      return IconBrandTypescript
    }
    case 'PlanetScale': {
      return IconBrandPlanetscale
    }
    case 'Next.js': {
      return IconBrandNextjs
    }
    case 'Prisma': {
      return IconBrandPrisma
    }
    case 'MDX': {
      return IconMarkdown
    }
    case 'Tailwindcss': {
      return IconBrandTailwind
    }
    case 'Tools': {
      return IconTools
    }
    case 'Checks': {
      return IconChecks
    }
    case 'Book2': {
      return IconBook2
    }
    case 'Link': {
      return IconLink
    }
    case 'Pencil': {
      return IconPencil
    }
    case 'Photo': {
      return IconPhoto
    }
    case 'Friends': {
      return IconFriends
    }
    case 'Neon': {
      return IconDatabase
    }
    default: {
      throw new Error('Icon not found')
    }
  }
}

export default getIconByName

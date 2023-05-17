import {
  IconBook2,
  IconBrandFirebase,
  IconBrandNextjs,
  IconBrandPlanetscale,
  IconBrandPrisma,
  IconBrandRadixUi,
  IconBrandTailwind,
  IconBrandTypescript,
  IconChecks,
  IconFriends,
  IconLayoutCollage,
  IconLink,
  IconMarkdown,
  IconPencil,
  IconPhoto,
  IconTools,
} from '@tabler/icons-react'

const getIconByName = (name: string) => {
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
    case 'Firebase': {
      return IconBrandFirebase
    }
    case 'Radix UI': {
      return IconBrandRadixUi
    }
    case 'LayoutCollage': {
      return IconLayoutCollage
    }
    default: {
      throw Error('Icon not found')
    }
  }
}

export default getIconByName

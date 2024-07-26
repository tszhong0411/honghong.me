import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
  SiYoutube
} from '@icons-pack/react-simple-icons'
import {
  BarChartIcon,
  FlameIcon,
  MessageCircleIcon,
  MonitorIcon,
  PencilIcon,
  UserCircleIcon
} from 'lucide-react'

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'

type HeaderLinks = Array<{
  icon: React.ReactNode
  href: string
  text: string
}>

type FooterLinks = Array<{
  id: number
  links: Array<{
    href: string
    text: string
  }>
}>

type SocialLinks = Array<{
  href: string
  title: string
  icon: IconType
}>

export const HEADER_LINKS: HeaderLinks = [
  {
    icon: <PencilIcon className='size-3.5' />,
    href: '/blog',
    text: 'Blog'
  },
  {
    icon: <MessageCircleIcon className='size-3.5' />,
    href: '/guestbook',
    text: 'Guestbook'
  },
  {
    icon: <BarChartIcon className='size-3.5' />,
    href: '/dashboard',
    text: 'Dashboard'
  },
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    text: 'Projects'
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    text: 'About'
  },
  {
    icon: <MonitorIcon className='size-3.5' />,
    href: '/uses',
    text: 'Uses'
  }
]

export const FOOTER_LINKS: FooterLinks = [
  {
    id: 1,
    links: [
      {
        href: '/',
        text: 'Home'
      },
      {
        href: '/blog',
        text: 'Blog'
      },
      {
        href: '/about',
        text: 'About'
      },
      {
        href: '/dashboard',
        text: 'Dashboard'
      }
    ]
  },
  {
    id: 2,
    links: [
      {
        href: '/guestbook',
        text: 'Guestbook'
      },
      {
        href: '/uses',
        text: 'Uses'
      },
      {
        href: '/projects',
        text: 'Projects'
      },
      {
        href: 'https://links.honghong.me',
        text: 'Links'
      }
    ]
  },
  {
    id: 3,
    links: [
      {
        href: SITE_FACEBOOK_URL,
        text: 'Facebook'
      },
      {
        href: SITE_INSTAGRAM_URL,
        text: 'Instagram'
      },
      {
        href: SITE_GITHUB_URL,
        text: 'GitHub'
      },
      {
        href: SITE_YOUTUBE_URL,
        text: 'YouTube'
      }
    ]
  }
]

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: SiGithub
  },
  {
    href: SITE_FACEBOOK_URL,
    title: 'Facebook',
    icon: SiFacebook
  },
  {
    href: SITE_INSTAGRAM_URL,
    title: 'Instagram',
    icon: SiInstagram
  },
  {
    href: SITE_X_URL,
    title: 'X',
    icon: SiX
  },
  {
    href: SITE_YOUTUBE_URL,
    title: 'YouTube',
    icon: SiYoutube
  }
]

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconChartBar,
  IconDeviceDesktop,
  IconFlame,
  IconMessageCircle,
  IconPencil,
  IconUserCircle,
} from '@tabler/icons-react'

type HeroLinks = {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}[]

type HeaderLinks = {
  icon: React.ReactNode
  href: string
  text: string
}[]

type FooterLinks = {
  id: number
  links: {
    href: string
    title: string
  }[]
}[]

type FooterSocialMediaLinks = {
  href: string
  title: string
}[]

export const HEADER_LINKS: HeaderLinks = [
  {
    icon: <IconPencil size={14} />,
    href: '/blog',
    text: 'Blog',
  },
  {
    icon: <IconMessageCircle size={14} />,
    href: '/guestbook',
    text: 'Guestbook',
  },
  {
    icon: <IconChartBar size={14} />,
    href: '/dashboard',
    text: 'Dashboard',
  },
  {
    icon: <IconFlame size={14} />,
    href: '/projects',
    text: 'Projects',
  },
  {
    icon: <IconUserCircle size={14} />,
    href: '/about',
    text: 'About',
  },
  {
    icon: <IconDeviceDesktop size={14} />,
    href: '/uses',
    text: 'Uses',
  },
]

export const FOOTER_LINKS: FooterLinks = [
  {
    id: 1,
    links: [
      {
        href: '/',
        title: 'Home',
      },
      {
        href: '/blog',
        title: 'Blog',
      },
      {
        href: '/about',
        title: 'About',
      },
      {
        href: '/dashboard',
        title: 'Dashboard',
      },
    ],
  },
  {
    id: 2,
    links: [
      {
        href: '/guestbook',
        title: 'Guestbook',
      },
      {
        href: '/uses',
        title: 'Uses',
      },
      {
        href: '/projects',
        title: 'Projects',
      },
      {
        href: 'https://ui.honghong.me',
        title: 'Design',
      },
    ],
  },
]

export const FOOTER_SOCIAL_MEDIA: FooterSocialMediaLinks = [
  {
    href: 'https://www.facebook.com/tszhonglai.0411/',
    title: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/tszhong0411/',
    title: 'Instagram',
  },
  {
    href: 'https://github.com/tszHong0411',
    title: 'GitHub',
  },
  {
    href: 'https://www.youtube.com/@tszhong0411',
    title: 'YouTube',
  },
]

export const HERO_LINKS: HeroLinks = [
  {
    id: 'github',
    label: 'GitHub',
    icon: <IconBrandGithub size={28} />,
    href: 'https://github.com/tszhong0411',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <IconBrandInstagram size={28} />,
    href: 'https://www.instagram.com/tszhong0411/',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: <IconBrandYoutube size={28} />,
    href: 'https://www.youtube.com/@tszhong0411',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: <IconBrandFacebook size={28} />,
    href: 'https://www.facebook.com/tszhonglai.0411/',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: <IconBrandTwitter size={28} />,
    href: 'https://twitter.com/TszhongLai0411',
  },
]

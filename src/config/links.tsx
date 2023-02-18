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

import { DropdownItemType } from '@/components/Dropdown'
import { HeroLinks } from '@/components/Home/Hero'
import { FooterLinks } from '@/components/Layout/Footer'

export const HEADER_LINKS: DropdownItemType[] = [
  {
    icon: <IconPencil />,
    href: '/blog',
    text: '部落格',
  },
  {
    icon: <IconMessageCircle />,
    href: '/guestbook',
    text: '留言簿',
  },
  {
    icon: <IconChartBar />,
    href: '/dashboard',
    text: '儀錶板',
  },
  {
    icon: <IconFlame />,
    href: '/projects',
    text: '項目',
  },
  {
    icon: <IconUserCircle />,
    href: '/about',
    text: '關於',
  },
  {
    icon: <IconDeviceDesktop />,
    href: '/uses',
    text: '設備',
  },
]

export const FOOTER_LINKS: FooterLinks = [
  {
    links: [
      {
        href: '/',
        title: '首頁',
      },
      {
        href: '/blog',
        title: '部落格',
      },
      {
        href: '/about',
        title: '關於',
      },
      {
        href: '/feed.xml',
        title: 'RSS',
      },
    ],
  },
  {
    links: [
      {
        href: '/guestbook',
        title: '留言簿',
      },
      {
        href: '/uses',
        title: '設備',
      },
      {
        href: '/projects',
        title: '項目',
      },
      {
        href: '/design',
        title: '設計',
      },
    ],
  },
  {
    links: [
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
    ],
  },
]

export const HERO_LINKS: HeroLinks = [
  {
    icon: <IconBrandGithub size={28} />,
    href: 'https://github.com/tszhong0411',
  },
  {
    icon: <IconBrandInstagram size={28} />,
    href: 'https://www.instagram.com/tszhong0411/',
  },
  {
    icon: <IconBrandYoutube size={28} />,
    href: 'https://www.youtube.com/@tszhong0411',
  },
  {
    icon: <IconBrandFacebook size={28} />,
    href: 'https://www.facebook.com/tszhonglai.0411/',
  },
  {
    icon: <IconBrandTwitter size={28} />,
    href: 'https://twitter.com/TszhongLai0411',
  },
]

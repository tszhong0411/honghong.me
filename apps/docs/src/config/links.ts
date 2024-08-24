type BaseLink = {
  href: string
  text: string
}

type HeaderLinks = BaseLink[]

type SidebarLinks = Array<{
  title: string
  links: BaseLink[]
}>

export const HEADER_LINKS: HeaderLinks = [
  {
    href: 'https://github.com/tszhong0411/honghong.me',
    text: 'GitHub'
  }
]

export const SIDEBAR_LINKS: SidebarLinks = [
  {
    title: 'Getting Started',
    links: [
      {
        href: '/',
        text: 'Introduction'
      }
    ]
  },
  {
    title: 'UI / Components',
    links: [
      {
        href: '/ui/components/alert-dialog',
        text: 'Alert Dialog'
      },
      {
        href: '/ui/components/aspect-ratio',
        text: 'Aspect Ratio'
      },
      {
        href: '/ui/components/avatar',
        text: 'Avatar'
      },
      {
        href: '/ui/components/blur-image',
        text: 'Blur Image'
      },
      {
        href: '/ui/components/button',
        text: 'Button'
      },
      {
        href: '/ui/components/callout',
        text: 'Callout'
      },
      {
        href: '/ui/components/card',
        text: 'Card'
      },
      {
        href: '/ui/components/checkbox',
        text: 'Checkbox'
      },
      {
        href: '/ui/components/collapsible',
        text: 'Collapsible'
      },
      {
        href: '/ui/components/command',
        text: 'Command'
      },
      {
        href: '/ui/components/dialog',
        text: 'Dialog'
      },
      {
        href: '/ui/components/dropdown-menu',
        text: 'Dropdown Menu'
      },
      {
        href: '/ui/components/files',
        text: 'Files'
      },
      {
        href: '/ui/components/form',
        text: 'Form'
      },
      {
        href: '/ui/components/input',
        text: 'Input'
      },
      {
        href: '/ui/components/label',
        text: 'Label'
      },
      {
        href: '/ui/components/link',
        text: 'Link'
      },
      {
        href: '/ui/components/marquee',
        text: 'Marquee'
      },
      {
        href: '/ui/components/popover',
        text: 'Popover'
      },
      {
        href: '/ui/components/scroll-area',
        text: 'Scroll Area'
      },
      {
        href: '/ui/components/select',
        text: 'Select'
      },
      {
        href: '/ui/components/separator',
        text: 'Separator'
      },
      {
        href: '/ui/components/sheet',
        text: 'Sheet'
      },
      {
        href: '/ui/components/skeleton',
        text: 'Skeleton'
      },
      {
        href: '/ui/components/table',
        text: 'Table'
      },
      {
        href: '/ui/components/tabs',
        text: 'Tabs'
      },
      {
        href: '/ui/components/textarea',
        text: 'Textarea'
      },
      {
        href: '/ui/components/toaster',
        text: 'Toaster'
      },
      {
        href: '/ui/components/tooltip',
        text: 'Tooltip'
      }
    ]
  }
]

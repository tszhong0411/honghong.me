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

const COMPONENT_LINKS = [
  {
    href: '/ui/components/accordion',
    text: 'Accordion'
  },
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
    href: '/ui/components/badge',
    text: 'Badge'
  },
  {
    href: '/ui/components/blur-fade',
    text: 'Blur Fade'
  },
  {
    href: '/ui/components/blur-image',
    text: 'Blur Image'
  },
  {
    href: '/ui/components/breadcrumb',
    text: 'Breadcrumb'
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
    href: '/ui/components/carousel',
    text: 'Carousel'
  },
  {
    href: '/ui/components/checkbox',
    text: 'Checkbox'
  },
  {
    href: '/ui/components/code-block',
    text: 'Code Block'
  },
  {
    href: '/ui/components/collapsible',
    text: 'Collapsible'
  },
  {
    href: '/ui/components/combobox',
    text: 'Combobox'
  },
  {
    href: '/ui/components/command',
    text: 'Command'
  },
  {
    href: '/ui/components/context-menu',
    text: 'Context Menu'
  },
  {
    href: '/ui/components/data-table',
    text: 'Data Table'
  },
  {
    href: '/ui/components/dialog',
    text: 'Dialog'
  },
  {
    href: '/ui/components/drawer',
    text: 'Drawer'
  },
  {
    href: '/ui/components/dropdown-menu',
    text: 'Dropdown Menu'
  },
  {
    href: '/ui/components/form',
    text: 'Form'
  },
  {
    href: '/ui/components/hover-card',
    text: 'Hover Card'
  },
  {
    href: '/ui/components/input-otp',
    text: 'Input OTP'
  },
  {
    href: '/ui/components/input',
    text: 'Input'
  },
  {
    href: '/ui/components/kbd',
    text: 'Kbd'
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
    href: '/ui/components/menubar',
    text: 'Menubar'
  },
  {
    href: '/ui/components/navigation-menu',
    text: 'Navigation Menu'
  },
  {
    href: '/ui/components/pagination',
    text: 'Pagination'
  },
  {
    href: '/ui/components/popover',
    text: 'Popover'
  },
  {
    href: '/ui/components/progress',
    text: 'Progress'
  },
  {
    href: '/ui/components/radio-group',
    text: 'Radio Group'
  },
  {
    href: '/ui/components/resizable',
    text: 'Resizable'
  },
  {
    href: '/ui/components/scroll-area',
    text: 'Scroll Area'
  },
  {
    href: '/ui/components/segment-group',
    text: 'Segment Group'
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
    href: '/ui/components/sidebar',
    text: 'Sidebar'
  },
  {
    href: '/ui/components/skeleton',
    text: 'Skeleton'
  },
  {
    href: '/ui/components/slider',
    text: 'Slider'
  },
  {
    href: '/ui/components/switch',
    text: 'Switch'
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
    href: '/ui/components/toggle-group',
    text: 'Toggle Group'
  },
  {
    href: '/ui/components/toggle',
    text: 'Toggle'
  },
  {
    href: '/ui/components/tooltip',
    text: 'Tooltip'
  },
  {
    href: '/ui/components/tree-view',
    text: 'Tree View'
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
    title: 'Recipes',
    links: [
      {
        href: '/recipes/drizzle',
        text: 'Drizzle'
      },
      {
        href: '/recipes/env',
        text: 'env'
      }
    ]
  },
  {
    title: 'UI / Components',
    links: COMPONENT_LINKS
  },
  {
    title: 'UI / Utilities',
    links: [
      {
        href: '/ui/utilities/get-avatar-abbreviation',
        text: 'getAvatarAbbreviation'
      }
    ]
  }
]

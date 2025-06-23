type BaseLink = {
  href: string
  text: string
}

type ComponentLink = BaseLink & {
  isArkUI?: boolean
}

type HeaderLinks = BaseLink[]

type SidebarLinks = Array<{
  title: string
  links: Array<BaseLink | ComponentLink>
}>

export const HEADER_LINKS: HeaderLinks = [
  {
    href: 'https://github.com/tszhong0411/nelsonlai.me',
    text: 'GitHub'
  }
]

const COMPONENT_LINKS = [
  {
    href: '/ui/accordion',
    text: 'Accordion'
  },
  {
    href: '/ui/alert-dialog',
    text: 'Alert Dialog'
  },
  {
    href: '/ui/alert',
    text: 'Alert'
  },
  {
    href: '/ui/aspect-ratio',
    text: 'Aspect Ratio'
  },
  {
    href: '/ui/avatar',
    text: 'Avatar'
  },
  {
    href: '/ui/badge',
    text: 'Badge'
  },
  {
    href: '/ui/breadcrumb',
    text: 'Breadcrumb'
  },
  {
    href: '/ui/button',
    text: 'Button'
  },
  {
    href: '/ui/calendar',
    text: 'Calendar'
  },
  {
    href: '/ui/card',
    text: 'Card'
  },
  {
    href: '/ui/carousel',
    text: 'Carousel'
  },
  {
    href: '/ui/chart',
    text: 'Chart'
  },
  {
    href: '/ui/checkbox',
    text: 'Checkbox'
  },
  {
    href: '/ui/code-block',
    text: 'Code Block'
  },
  {
    href: '/ui/collapsible',
    text: 'Collapsible'
  },
  {
    href: '/ui/combobox',
    text: 'Combobox'
  },
  {
    href: '/ui/command',
    text: 'Command'
  },
  {
    href: '/ui/context-menu',
    text: 'Context Menu'
  },
  {
    href: '/ui/data-table',
    text: 'Data Table'
  },
  {
    href: '/ui/dialog',
    text: 'Dialog'
  },
  {
    href: '/ui/drawer',
    text: 'Drawer'
  },
  {
    href: '/ui/dropdown-menu',
    text: 'Dropdown Menu'
  },
  {
    href: '/ui/form',
    text: 'Form'
  },
  {
    href: '/ui/hover-card',
    text: 'Hover Card'
  },
  {
    href: '/ui/input-otp',
    text: 'Input OTP'
  },
  {
    href: '/ui/input',
    text: 'Input'
  },
  {
    href: '/ui/kbd',
    text: 'Kbd'
  },
  {
    href: '/ui/label',
    text: 'Label'
  },
  {
    href: '/ui/link',
    text: 'Link'
  },
  {
    href: '/ui/marquee',
    text: 'Marquee'
  },
  {
    href: '/ui/menubar',
    text: 'Menubar'
  },
  {
    href: '/ui/navigation-menu',
    text: 'Navigation Menu'
  },
  {
    href: '/ui/pagination',
    text: 'Pagination',
    isArkUI: true
  },
  {
    href: '/ui/popover',
    text: 'Popover'
  },
  {
    href: '/ui/progress',
    text: 'Progress'
  },
  {
    href: '/ui/radio-group',
    text: 'Radio Group'
  },
  {
    href: '/ui/resizable',
    text: 'Resizable'
  },
  {
    href: '/ui/scroll-area',
    text: 'Scroll Area'
  },
  {
    href: '/ui/segment-group',
    text: 'Segment Group',
    isArkUI: true
  },
  {
    href: '/ui/select',
    text: 'Select'
  },
  {
    href: '/ui/separator',
    text: 'Separator'
  },
  {
    href: '/ui/sheet',
    text: 'Sheet'
  },
  {
    href: '/ui/sidebar',
    text: 'Sidebar'
  },
  {
    href: '/ui/skeleton',
    text: 'Skeleton'
  },
  {
    href: '/ui/slider',
    text: 'Slider'
  },
  {
    href: '/ui/sonner',
    text: 'Sonner'
  },
  {
    href: '/ui/sortable',
    text: 'Sortable'
  },
  {
    href: '/ui/switch',
    text: 'Switch'
  },
  {
    href: '/ui/table',
    text: 'Table'
  },
  {
    href: '/ui/tabs',
    text: 'Tabs'
  },
  {
    href: '/ui/textarea',
    text: 'Textarea'
  },
  {
    href: '/ui/toggle-group',
    text: 'Toggle Group'
  },
  {
    href: '/ui/toggle',
    text: 'Toggle'
  },
  {
    href: '/ui/tooltip',
    text: 'Tooltip'
  },
  {
    href: '/ui/tree-view',
    text: 'Tree View',
    isArkUI: true
  }
]

export const SIDEBAR_LINKS: SidebarLinks = [
  {
    title: 'Getting Started',
    links: [
      {
        href: '/',
        text: 'Introduction'
      },
      {
        href: '/getting-started/ui',
        text: 'UI'
      }
    ]
  },
  {
    title: 'Packages',
    links: [
      {
        href: '/packages/prettier-config',
        text: 'Prettier Config'
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
    title: 'Utilities',
    links: [
      {
        href: '/utilities/cn',
        text: 'cn'
      },
      {
        href: '/utilities/get-abbreviation',
        text: 'getAbbreviation'
      },
      {
        href: '/utilities/get-error-message',
        text: 'getErrorMessage'
      },
      {
        href: '/utilities/range',
        text: 'range'
      }
    ]
  },
  {
    title: 'UI / Components',
    links: COMPONENT_LINKS
  }
]

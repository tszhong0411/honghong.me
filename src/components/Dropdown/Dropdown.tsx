import * as DropdownPrimitives from '@radix-ui/react-dropdown-menu'

import clsxm from '@/lib/clsxm'

const Dropdown = (props: DropdownPrimitives.DropdownMenuProps) => {
  return <DropdownPrimitives.Root {...props} />
}

const Trigger = (props: DropdownPrimitives.DropdownMenuTriggerProps) => {
  const { children, ...rest } = props

  return (
    <DropdownPrimitives.Trigger
      asChild={typeof children !== 'string'}
      className='outline-none'
      {...rest}
    >
      {children}
    </DropdownPrimitives.Trigger>
  )
}

const Content = (props: DropdownPrimitives.DropdownMenuContentProps) => {
  const { children, className, ...rest } = props

  return (
    <DropdownPrimitives.Portal>
      <DropdownPrimitives.Content
        className={clsxm(
          'absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md border border-accent-2 bg-hong-bg py-2 transition-colors',
          className
        )}
        {...rest}
      >
        {children}
      </DropdownPrimitives.Content>
    </DropdownPrimitives.Portal>
  )
}

const Item = (props: DropdownPrimitives.DropdownMenuItemProps) => {
  const { children, className, ...rest } = props

  return (
    <DropdownPrimitives.Item
      className={clsxm(
        'w-full py-3 px-4 text-sm outline-none duration-300 data-[highlighted]:bg-accent-1',
        className
      )}
      {...rest}
    >
      {children}
    </DropdownPrimitives.Item>
  )
}

Dropdown.displayName = 'Dropdown'
Dropdown.Trigger = Trigger
Dropdown.Content = Content
Dropdown.Item = Item

export default Dropdown

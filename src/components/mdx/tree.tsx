import { IconChevronRight, IconFile, IconFolder } from '@tabler/icons-react'
import React from 'react'

import cn from '@/utils/cn'

type Node = {
  name: string
  children?: Node[]
}

type TreeProps = {
  data: Node[]
}

type InnerType = {
  data: Node[]
  level: number
}

type NodeProps = {
  name: string
  children?: Node[]
  level: number
}

const Tree = (props: TreeProps) => {
  return (
    <div className='not-prose rounded-lg border bg-accent px-6 py-4'>
      <Inner {...props} level={0} />
    </div>
  )
}

const Inner = (props: InnerType) => {
  const { data, level } = props

  return (
    <ul
      {...(level > 0 && {
        'data-testid': 'tree-node-children'
      })}
    >
      {data.map((node, i) => (
        <Node key={i} level={level} {...node} />
      ))}
    </ul>
  )
}

const Node = (props: NodeProps) => {
  const { name, children, level } = props
  const [isOpen, setIsOpen] = React.useState(true)
  const hasChildren = children && children.length > 0
  const El = hasChildren ? 'button' : 'div'

  return (
    <li key={name}>
      <El
        className='relative flex h-8 items-center gap-1.5'
        style={{
          paddingLeft: level * 24
        }}
        data-testid='tree-node-file'
        {...(hasChildren && {
          type: 'button',
          onClick: () => setIsOpen((value) => !value),
          'data-testid': 'tree-node-folder'
        })}
      >
        <IconChevronRight
          size={22}
          className={cn(!children && 'invisible', isOpen && 'rotate-90')}
        />
        {children ? <IconFolder size={20} /> : <IconFile size={20} />}
        <div>{name}</div>
      </El>

      {isOpen && children ? <Inner data={children} level={level + 1} /> : null}
    </li>
  )
}

export default Tree

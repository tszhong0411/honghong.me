import { IconFile, IconFolder } from '@tabler/icons-react'
import React from 'react'

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

const Tree = (props: TreeProps) => {
  return (
    <div className='rounded-lg border bg-accent px-6 py-4'>
      <Inner {...props} level={0} />
    </div>
  )
}

const Inner = (props: InnerType) => {
  const { data, level } = props

  return (
    <>
      {data.map((node) => (
        <React.Fragment key={node.name}>
          <div className='relative flex items-center gap-2'>
            {[...Array.from({ length: level }).keys()].map((i) => (
              <div
                key={i}
                className='absolute h-full w-px -translate-x-1/2 bg-zinc-700'
                style={{
                  left: `calc(${i * 20}px + ${i * 4}px + 10px)`
                }}
              />
            ))}
            <div
              style={{
                paddingLeft: level * 24
              }}
            >
              {node.children ? (
                <IconFolder size={20} />
              ) : (
                <IconFile size={20} />
              )}
            </div>
            <div className='font-mono'>{node.name}</div>
          </div>

          {node.children ? (
            <Inner data={node.children} level={level + 1} />
          ) : null}
        </React.Fragment>
      ))}
    </>
  )
}

export default Tree

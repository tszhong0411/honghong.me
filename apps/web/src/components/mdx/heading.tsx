/**
 * Adapted from: https://github.com/fuma-nama/fumadocs/blob/82c273917280f63da95687852135f89a08593e71/packages/ui/src/components/heading.tsx
 */
import { cn } from '@tszhong0411/utils'
import { LinkIcon } from 'lucide-react'

type Types = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingProps<T extends Types> = Omit<React.ComponentPropsWithoutRef<T>, 'as'> & {
  as?: T
}

const Heading = <T extends Types = 'h1'>(props: HeadingProps<T>) => {
  const { as, className, children, id, ...rest } = props
  const Component = as ?? 'h1'

  return (
    <Component className={cn('scroll-m-32', className)} id={id} {...rest}>
      <a href={`#${id}`} className='not-prose group'>
        {children}
        <LinkIcon
          aria-label='Link to section'
          className='text-muted-foreground ml-2 inline size-4 opacity-0 transition-opacity group-hover:opacity-100'
        />
      </a>
    </Component>
  )
}

export default Heading

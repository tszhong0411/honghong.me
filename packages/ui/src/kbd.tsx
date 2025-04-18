import { cn } from '@tszhong0411/utils'

type KbdProps = React.ComponentProps<'kbd'>

const Kbd = (props: KbdProps) => {
  const { className, ...rest } = props

  return (
    <kbd
      className={cn(
        'bg-muted text-muted-foreground inline-flex items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-sm',
        className
      )}
      {...rest}
    />
  )
}

export { Kbd }

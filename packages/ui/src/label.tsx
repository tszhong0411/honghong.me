import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@tszhong0411/utils'

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>

const Label = (props: LabelProps) => {
  const { className, ...rest } = props

  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        'flex select-none items-center gap-2 text-sm font-medium leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export { Label }

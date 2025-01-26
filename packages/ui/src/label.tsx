import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'cva'

const labelVariants = cva({
  base: [
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  ]
})

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>

const Label = (props: LabelProps) => {
  const { className, ...rest } = props

  return <LabelPrimitive.Root className={cn(labelVariants(), className)} {...rest} />
}

export { Label, labelVariants }

'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const labelVariants = cva([
  'text-sm font-medium leading-none',
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
])

export const Label = (
  props: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
) => {
  const { className, ...rest } = props

  return <LabelPrimitive.Root className={cn(labelVariants(), className)} {...rest} />
}

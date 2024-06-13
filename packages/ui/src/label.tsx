'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

const labelVariants = cva([
  'text-sm font-medium leading-none',
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
])

export const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>((props, ref) => {
  const { className, ...rest } = props

  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...rest} />
})

Label.displayName = LabelPrimitive.Root.displayName

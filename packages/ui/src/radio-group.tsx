import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@tszhong0411/utils'
import { CircleIcon } from 'lucide-react'

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>

const RadioGroup = (props: RadioGroupProps) => {
  const { className, ...rest } = props

  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...rest}
    />
  )
}

type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { className, ...rest } = props

  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'border-input text-primary shadow-xs aspect-square size-4 shrink-0 rounded-full border outline-none transition-[color,box-shadow]',
        'dark:aria-invalid:ring-destructive/40 dark:bg-input/30',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      >
        <CircleIcon className='fill-primary absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

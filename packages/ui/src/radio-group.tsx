import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@tszhong0411/utils'
import { CircleIcon } from 'lucide-react'

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>

const RadioGroup = (props: RadioGroupProps) => {
  const { className, ...rest } = props

  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...rest} />
}

type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { className, ...rest } = props

  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-primary text-primary ring-offset-background aspect-square size-4 rounded-full border',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <CircleIcon className='size-2.5 fill-current text-current' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

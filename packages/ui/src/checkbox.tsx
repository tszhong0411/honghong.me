import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@tszhong0411/utils'
import { CheckIcon } from 'lucide-react'

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

const Checkbox = (props: CheckboxProps) => {
  const { className, ...rest } = props

  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'border-input shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow',
        'dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        className
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@tszhong0411/utils'

type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root>

const Switch = (props: SwitchProps) => {
  const { className, ...rest } = props

  return (
    <SwitchPrimitives.Root
      className={cn(
        'shadow-xs peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'bg-background pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition-transform',
          'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }

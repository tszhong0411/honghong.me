import { cn } from '@tszhong0411/utils'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { useContext } from 'react'

type InputOTPProps = React.ComponentProps<typeof OTPInput>

const InputOTP = (props: InputOTPProps) => {
  const { className, containerClassName, ...rest } = props

  return (
    <OTPInput
      containerClassName={cn('has-disabled:opacity-50 flex items-center gap-2', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      {...rest}
    />
  )
}

type InputOTPGroupProps = React.ComponentProps<'div'>

const InputOTPGroup = (props: InputOTPGroupProps) => {
  const { className, ...rest } = props

  return (
    <div
      aria-label='One-time password input'
      className={cn('flex items-center', className)}
      {...rest}
    />
  )
}

type InputOTPSlotProps = React.ComponentProps<'div'> & { index: number }

const InputOTPSlot = (props: InputOTPSlotProps) => {
  const { index, className, ...rest } = props

  const inputOTPContext = useContext(OTPInputContext)

  const slot = inputOTPContext.slots[index]
  const { char, hasFakeCaret, isActive } = slot ?? {}

  return (
    <div
      role='presentation'
      className={cn(
        'border-input shadow-xs relative flex size-9 items-center justify-center border-y border-r transition-all',
        'first:rounded-l-md first:border-l',
        'last:rounded-r-md',
        isActive && 'ring-ring z-10 ring-1',
        className
      )}
      {...rest}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
        </div>
      )}
    </div>
  )
}

type InputOTPSeparatorProps = React.ComponentProps<'div'>

const InputOTPSeparator = (props: InputOTPSeparatorProps) => (
  <div role='separator' aria-hidden='true' {...props}>
    <MinusIcon />
  </div>
)

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
export { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'

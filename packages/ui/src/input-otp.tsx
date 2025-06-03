'use client'

import { cn } from '@tszhong0411/utils'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { use } from 'react'

type InputOTPProps = React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}

const InputOTP = (props: InputOTPProps) => {
  const { className, containerClassName, ...rest } = props

  return (
    <OTPInput
      data-slot='input-otp'
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
    <div data-slot='input-otp-group' className={cn('flex items-center', className)} {...rest} />
  )
}

type InputOTPSlotProps = React.ComponentProps<'div'> & {
  index: number
}

const InputOTPSlot = (props: InputOTPSlotProps) => {
  const { index, className, ...rest } = props
  const inputOTPContext = use(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {}

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        'border-input shadow-xs relative flex size-9 items-center justify-center border-y border-r text-sm outline-none transition-all',
        'dark:data-[active=true]:aria-invalid:ring-destructive/40 dark:bg-input/30',
        'first:rounded-l-md first:border-l',
        'last:rounded-r-md',
        'aria-invalid:border-destructive',
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 data-[active=true]:aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:ring-[3px]',
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
  <div data-slot='input-otp-separator' role='separator' {...props}>
    <MinusIcon />
  </div>
)

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
export { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'

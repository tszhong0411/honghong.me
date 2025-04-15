'use client'

import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { use } from 'react'

import { cn } from '@/utils/cn'

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
  const { className, index, ...rest } = props

  const inputOTPContext = use(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {}

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        'dark:bg-input/30 border-input shadow-xs relative flex h-9 w-9 items-center justify-center border-y border-r text-sm outline-none transition-all',
        'first:rounded-l-md first:border-l',
        'last:rounded-r-md',
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:z-10 data-[active=true]:ring-[3px]',
        'aria-invalid:border-destructive',
        'data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 data-[active=true]:aria-invalid:border-destructive',
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

const InputOTPSeparator = (props: InputOTPSeparatorProps) => {
  return (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }

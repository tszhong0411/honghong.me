'use client'

import { useState } from 'react'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const InputOTPControlledDemo = () => {
  const [value, setValue] = useState('')

  return (
    <div className='space-y-2'>
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className='text-center text-sm'>
        {value === '' ? <>Enter your one-time password.</> : <>You entered: {value}</>}
      </div>
    </div>
  )
}

export default InputOTPControlledDemo

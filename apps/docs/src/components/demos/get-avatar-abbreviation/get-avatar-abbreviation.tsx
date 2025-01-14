'use client'

import { getAvatarAbbreviation, Input } from '@tszhong0411/ui'
import { useState } from 'react'

const GetAvatarAbbreviationDemo = () => {
  const [value, setValue] = useState('John Doe')

  return (
    <div className='w-full max-w-md'>
      <Input
        type='text'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder='Enter a name...'
        className='input'
      />
      <p className='text-muted-foreground mt-2 text-sm'>
        Abbreviation: {getAvatarAbbreviation(value)}
      </p>
    </div>
  )
}

export default GetAvatarAbbreviationDemo

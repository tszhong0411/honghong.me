'use client'

import { Input } from '@tszhong0411/ui'
import { useState } from 'react'

import { getAbbreviation } from '@/utils/get-abbreviation'

const GetAbbreviationDemo = () => {
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
      <p className='text-muted-foreground mt-2 text-sm'>Abbreviation: {getAbbreviation(value)}</p>
    </div>
  )
}

export default GetAbbreviationDemo

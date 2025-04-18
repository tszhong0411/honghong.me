'use client'

import { Label, Slider } from '@tszhong0411/ui'
import { useState } from 'react'

const SliderRangeDemo = () => {
  const [value, setValue] = useState([0.3, 0.7])

  return (
    <div className='grid w-full max-w-sm gap-3'>
      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='slider-demo-temperature'>Temperature</Label>
        <span className='text-muted-foreground text-sm'>{value.join(', ')}</span>
      </div>
      <Slider
        id='slider-demo-temperature'
        value={value}
        onValueChange={setValue}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}

export default SliderRangeDemo

'use client'

import { Calendar } from '@tszhong0411/ui'
import { useState } from 'react'

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(() => new Date())

  return (
    <Calendar
      mode='single'
      selected={date}
      onSelect={setDate}
      className='rounded-md border shadow-sm'
    />
  )
}

export default CalendarDemo

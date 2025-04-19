'use client'

import type { DateRange } from 'react-day-picker'

import { Calendar } from '@tszhong0411/ui'
import { addDays } from 'date-fns'
import { useState } from 'react'

const CalendarRangeDemo = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
  }))
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 50)
  }))

  return (
    <div>
      <Calendar
        mode='range'
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        disabled={(d) => d > new Date() || d < new Date('1900-01-01')}
        className='rounded-md border shadow-sm'
      />
      <Calendar
        mode='range'
        defaultMonth={range?.from}
        selected={range}
        onSelect={setRange}
        numberOfMonths={3}
        className='@4xl:flex hidden rounded-md border shadow-sm [&>div]:gap-5'
      />
    </div>
  )
}

export default CalendarRangeDemo

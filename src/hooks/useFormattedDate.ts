import dayjs from 'dayjs'
import React from 'react'

export const useFormattedDate = (date: string | Date, format?: string) => {
  const [formattedDate, setFormattedDate] = React.useState('')

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format(format ?? 'MMMM DD, YYYY'))
  }, [date, format])

  return formattedDate
}

import dayjs from 'dayjs'
import React from 'react'
import 'dayjs/locale/zh-tw'

dayjs.locale('zh-tw')

export const useFormattedDate = (date: string | Date, format?: string) => {
  const [formattedDate, setFormattedDate] = React.useState(null)

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format(format ?? 'MMMM DD, YYYY'))
  }, [date, format])

  return formattedDate
}

import { dayjs } from '@tszhong0411/utils'
import * as React from 'react'

export const useFormattedDate = (date: Date) => {
  const [formattedDate, setFormattedDate] = React.useState<string | null>(null)

  React.useEffect(() => {
    const targetDate = dayjs(date)

    const weeksDiff = dayjs().diff(targetDate, 'week')

    if (Math.abs(weeksDiff) > 1) {
      setFormattedDate(`on ${targetDate.format('MMM DD, YYYY')}`)
    } else {
      setFormattedDate(dayjs().to(targetDate))
    }
  }, [date])

  return formattedDate
}

import * as React from 'react'

import { dayjs } from '@/utils/dayjs'

type Options = {
  format: string
  loading?: string
  relative?: boolean
  prefix?: string
  suffix?: string
}

export const useFormattedDate = (date: Date | string, options: Options) => {
  const {
    relative = false,
    format,
    loading,
    prefix = '',
    suffix = ''
  } = options
  const [formattedDate, setFormattedDate] = React.useState<string | null>(
    loading ?? null
  )

  React.useEffect(() => {
    if (relative) {
      const targetDate = dayjs(date)

      const weeksDiff = dayjs().diff(targetDate, 'week')

      if (Math.abs(weeksDiff) > 1) {
        setFormattedDate(`on ${targetDate.format(format)}`)
      } else {
        setFormattedDate(dayjs().to(targetDate))
      }

      return
    }

    setFormattedDate(`${prefix}${dayjs(date).format(format)}${suffix}`)
  }, [date, format, prefix, relative, suffix])

  return formattedDate
}

import { type DateTimeFormatOptions, useFormatter } from '@tszhong0411/i18n/client'
import dayjs from 'dayjs'

type Options = {
  relative?: boolean
  formatOptions?: DateTimeFormatOptions
}

export const useFormattedDate = (date: Date | string, options: Options = {}) => {
  const {
    relative = false,
    formatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  } = options

  const format = useFormatter()
  const now = new Date()

  const convertedDate = typeof date === 'string' ? new Date(date) : date

  if (relative) {
    const weeksDiff = dayjs().diff(convertedDate, 'week')

    return Math.abs(weeksDiff) > 1
      ? format.dateTime(convertedDate, formatOptions)
      : format.relativeTime(convertedDate, now)
  } else {
    return format.dateTime(convertedDate, formatOptions)
  }
}

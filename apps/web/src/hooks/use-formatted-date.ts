import { useEffect, useMemo, useState } from 'react'

import { dayjs } from '@/utils/dayjs'

type Options = {
  format: string
  loading?: string
  relative?: boolean
  prefix?: string
  suffix?: string
}

export const useFormattedDate = (date: Date | string, options: Options) => {
  const { relative = false, format, loading, prefix = '', suffix = '' } = options
  const [formattedDate, setFormattedDate] = useState<string | null>(loading ?? null)

  const computedDate = useMemo(() => {
    if (relative) {
      const targetDate = dayjs(date)
      const weeksDiff = dayjs().diff(targetDate, 'week')

      return Math.abs(weeksDiff) > 1 ? `on ${targetDate.format(format)}` : dayjs().to(targetDate)
    } else {
      return `${prefix}${dayjs(date).format(format)}${suffix}`
    }
  }, [date, format, prefix, relative, suffix])

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect -- it needs to be computed on client side
    setFormattedDate(computedDate)
  }, [computedDate])

  return formattedDate
}

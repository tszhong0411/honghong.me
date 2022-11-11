import React from 'react'

const useFormattedDate = (date: string | Date, locale: string) => {
  const [formattedDate, setFormattedDate] = React.useState(null)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  React.useEffect(
    () => setFormattedDate(new Date(date).toLocaleDateString(locale, options)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, locale]
  )

  return formattedDate
}

export default useFormattedDate

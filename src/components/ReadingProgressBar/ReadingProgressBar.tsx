import React from 'react'

import useStyles from './ReadingProgressBar.styles'

export default function ReadingProgressBar() {
  const [width, setWidth] = React.useState(0)
  const { classes } = useStyles()

  const scrollHeight = () => {
    const el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight
    const percent = ScrollTop / (ScrollHeight - el.clientHeight)

    setWidth(percent)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHeight)
    return () => window.removeEventListener('scroll', scrollHeight)
  })

  return (
    <div className={classes.wrapper} style={{ width: `${width * 100}%` }}></div>
  )
}

import { Title } from '@mantine/core'
import React from 'react'

import { useStyles } from './PageLayout.styles'

type PageLayoutProps = {
  title: string
  description: string
}

export default function PageLayout({
  children,
  title,
  description,
}: React.PropsWithChildren<PageLayoutProps>) {
  const { classes } = useStyles()

  return (
    <div className={classes.layout}>
      <Title order={1} className={classes.title}>
        {title}
      </Title>
      <p className={classes.description}>{description}</p>
      {children}
    </div>
  )
}

import { Title } from '@mantine/core'
import React from 'react'

import { useStyles } from './PageLayout.styles'

type PageLayoutProps = {
  children: React.ReactNode
  title: string
  description: string
}

const PageLayout = (props: PageLayoutProps) => {
  const { children, title, description } = props
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

export default PageLayout

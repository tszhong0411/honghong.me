import { BlurFade } from '@tszhong0411/ui'

type TemplateProps = {
  children: React.ReactNode
}

const Template = (props: TemplateProps) => {
  const { children } = props

  return <BlurFade>{children}</BlurFade>
}

export default Template

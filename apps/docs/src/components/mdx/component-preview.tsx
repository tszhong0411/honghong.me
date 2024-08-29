import ComponentPreviewWrapper from './component-preview-wrapper'

type ComponentPreviewProps = {
  name: string
  children: React.ReactNode
}

const ComponentPreview = async (props: ComponentPreviewProps) => {
  const { name, children } = props

  const Component = (await import(`@/components/demos/${name}`)).default

  return <ComponentPreviewWrapper component={<Component />}>{children}</ComponentPreviewWrapper>
}

export default ComponentPreview

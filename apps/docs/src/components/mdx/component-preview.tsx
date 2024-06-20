import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tszhong0411/ui'

type ComponentPreviewProps = {
  name: string
  children: React.ReactNode
}

const ComponentPreview = async (props: ComponentPreviewProps) => {
  const { name, children } = props

  const Component = (await import(`@/components/demos/${name}`)).default

  return (
    <Tabs defaultValue='preview'>
      <TabsList>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='preview'>
        <div className='not-prose flex min-h-[350px] items-center justify-center rounded-lg border p-10'>
          <Component />
        </div>
      </TabsContent>
      <TabsContent value='code'>
        <div className='[&_pre]:max-h-[350px] [&_pre]:overflow-auto'>{children}</div>
      </TabsContent>
    </Tabs>
  )
}

export default ComponentPreview

'use client'

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@tszhong0411/ui'
import { RotateCcwIcon } from 'lucide-react'
import { useState } from 'react'

type ComponentPreviewWrapperProps = {
  component: React.ReactNode
  children: React.ReactNode
}

const ComponentPreviewWrapper = (props: ComponentPreviewWrapperProps) => {
  const { component: Component, children } = props
  const [key, setKey] = useState(0)

  return (
    <Tabs defaultValue='preview'>
      <TabsList>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='preview' className='relative' key={key}>
        <Button
          className='absolute right-1.5 top-1.5 z-10'
          variant='outline'
          size='icon'
          onClick={() => setKey((prev) => prev + 1)}
          aria-label='Reload preview'
        >
          <RotateCcwIcon />
        </Button>
        <div className='not-prose flex min-h-[350px] items-center justify-center rounded-lg border px-10 py-12'>
          {Component}
        </div>
      </TabsContent>
      <TabsContent value='code'>
        <div className='[&_figure]:m-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto'>{children}</div>
      </TabsContent>
    </Tabs>
  )
}

export default ComponentPreviewWrapper

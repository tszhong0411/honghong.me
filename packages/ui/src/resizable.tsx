import { cn } from '@tszhong0411/utils'
import { GripVerticalIcon } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

type ResizablePanelGroupProps = React.ComponentProps<typeof ResizablePrimitive.PanelGroup>

const ResizablePanelGroup = (props: ResizablePanelGroupProps) => {
  const { className, ...rest } = props

  return (
    <ResizablePrimitive.PanelGroup
      className={cn('flex size-full data-[panel-group-direction=vertical]:flex-col', className)}
      {...rest}
    />
  )
}

const ResizablePanel = ResizablePrimitive.Panel

type ResizableHandleProps = {
  withHandle?: boolean
} & React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>

const ResizableHandle = (props: ResizableHandleProps) => {
  const { withHandle, className, ...rest } = props

  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        'bg-border relative flex w-px items-center justify-center',
        'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
        '[&[data-panel-group-direction=vertical]>div]:rotate-90',
        className
      )}
      {...rest}
    >
      {withHandle && (
        <div className='bg-border rounded-xs z-10 flex h-4 w-3 items-center justify-center border'>
          <GripVerticalIcon className='size-2.5' />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }

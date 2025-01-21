import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@tszhong0411/utils'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>

const TooltipContent = (props: TooltipContentProps) => {
  const { className, sideOffset = 4, ...rest } = props

  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden rounded-lg border px-3 py-1.5 text-sm shadow-md',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        className
      )}
      {...rest}
    />
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

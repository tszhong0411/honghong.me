import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { cn } from '@tszhong0411/utils'

const HoverCard = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger

type HoverCardProps = React.ComponentProps<typeof HoverCardPrimitive.Content>

const HoverCardContent = (props: HoverCardProps) => {
  const { className, align = 'center', sideOffset = 4, ...rest } = props

  return (
    <HoverCardPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground outline-hidden z-50 w-64 rounded-lg border p-4 shadow-lg',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
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

export { HoverCard, HoverCardContent, HoverCardTrigger }

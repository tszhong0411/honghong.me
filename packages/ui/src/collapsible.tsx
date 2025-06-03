import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>

const Collapsible = (props: CollapsibleProps) => (
  <CollapsiblePrimitive.Root data-slot='collapsible' {...props} />
)

type CollapsibleTriggerProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>

const CollapsibleTrigger = (props: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.CollapsibleTrigger data-slot='collapsible-trigger' {...props} />
)

type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>

const CollapsibleContent = (props: CollapsibleContentProps) => (
  <CollapsiblePrimitive.CollapsibleContent data-slot='collapsible-content' {...props} />
)

export { Collapsible, CollapsibleContent, CollapsibleTrigger }

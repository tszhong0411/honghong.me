import { Toggle } from '@tszhong0411/ui'
import { UnderlineIcon } from 'lucide-react'

const ToggleDisabledDemo = () => {
  return (
    <Toggle aria-label='Toggle underline' disabled>
      <UnderlineIcon />
    </Toggle>
  )
}

export default ToggleDisabledDemo

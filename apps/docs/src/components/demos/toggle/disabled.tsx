import { Toggle } from '@tszhong0411/ui'
import { UnderlineIcon } from 'lucide-react'

const ToggleDisabled = () => {
  return (
    <Toggle aria-label='Toggle underline' disabled>
      <UnderlineIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleDisabled

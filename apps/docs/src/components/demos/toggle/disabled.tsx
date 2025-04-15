import { UnderlineIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const ToggleDisabledDemo = () => {
  return (
    <Toggle aria-label='Toggle underline' disabled>
      <UnderlineIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleDisabledDemo

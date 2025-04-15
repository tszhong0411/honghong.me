import { ItalicIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const ToggleSmallDemo = () => {
  return (
    <Toggle size='sm' aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleSmallDemo

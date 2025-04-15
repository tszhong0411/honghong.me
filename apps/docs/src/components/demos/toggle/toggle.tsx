import { ItalicIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const ToggleDemo = () => {
  return (
    <Toggle aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleDemo

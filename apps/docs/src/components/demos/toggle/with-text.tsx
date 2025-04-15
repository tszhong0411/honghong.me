import { ItalicIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const ToggleWithTextDemo = () => {
  return (
    <Toggle aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
      Italic
    </Toggle>
  )
}

export default ToggleWithTextDemo

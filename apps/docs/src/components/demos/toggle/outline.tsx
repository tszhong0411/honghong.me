import { ItalicIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const ToggleOutlineDemo = () => {
  return (
    <Toggle variant='outline' aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleOutlineDemo

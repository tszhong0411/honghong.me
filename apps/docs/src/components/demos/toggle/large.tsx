import { ItalicIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const ToggleLargeDemo = () => {
  return (
    <Toggle size='lg' aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleLargeDemo

import { Toggle } from '@tszhong0411/ui'
import { ItalicIcon } from 'lucide-react'

const ToggleLargeDemo = () => {
  return (
    <Toggle size='lg' aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleLargeDemo

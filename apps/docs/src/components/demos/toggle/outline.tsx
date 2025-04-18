import { Toggle } from '@tszhong0411/ui'
import { ItalicIcon } from 'lucide-react'

const ToggleOutlineDemo = () => {
  return (
    <Toggle variant='outline' aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleOutlineDemo

import { Toggle } from '@tszhong0411/ui'
import { ItalicIcon } from 'lucide-react'

const ToggleDemo = () => {
  return (
    <Toggle aria-label='Toggle italic'>
      <ItalicIcon className='size-4' />
    </Toggle>
  )
}

export default ToggleDemo

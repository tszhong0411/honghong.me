import { ToggleGroup, ToggleGroupItem } from '@tszhong0411/ui'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

const ToggleGroupDisabledDemo = () => {
  return (
    <ToggleGroup type='multiple' disabled>
      <ToggleGroupItem value='bold' aria-label='Toggle bold'>
        <BoldIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle italic'>
        <ItalicIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Toggle underline'>
        <UnderlineIcon className='size-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ToggleGroupDisabledDemo

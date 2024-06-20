import { Button } from '@tszhong0411/ui'
import { CopyIcon } from 'lucide-react'

const ButtonIcon = () => {
  return (
    <Button type='button' variant='outline' size='icon'>
      <CopyIcon className='size-4' />
    </Button>
  )
}

export default ButtonIcon

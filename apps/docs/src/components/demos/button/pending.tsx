import { Button } from '@tszhong0411/ui'
import { LoaderIcon } from 'lucide-react'

const ButtonPendingDemo = () => {
  return (
    <Button>
      <LoaderIcon className='animate-spin' />
      Pending
    </Button>
  )
}

export default ButtonPendingDemo

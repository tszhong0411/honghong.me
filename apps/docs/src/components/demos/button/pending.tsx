import { LoaderIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonPendingDemo = () => {
  return (
    <Button>
      <LoaderIcon className='animate-spin' />
      Pending
    </Button>
  )
}

export default ButtonPendingDemo

import { CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonIconDemo = () => {
  return (
    <Button variant='outline' size='icon' aria-label='Copy'>
      <CopyIcon />
    </Button>
  )
}

export default ButtonIconDemo

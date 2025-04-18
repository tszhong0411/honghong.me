import { Alert, AlertDescription, AlertTitle } from '@tszhong0411/ui'
import { AlertCircleIcon } from 'lucide-react'

const AlertDestructiveDemo = () => {
  return (
    <Alert variant='destructive' className='max-w-md'>
      <AlertCircleIcon />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  )
}

export default AlertDestructiveDemo

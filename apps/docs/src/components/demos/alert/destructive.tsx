import { AlertCircleIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const AlertDestructiveDemo = () => {
  return (
    <Alert variant='destructive'>
      <AlertCircleIcon />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  )
}

export default AlertDestructiveDemo

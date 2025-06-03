import { Alert, AlertDescription, AlertTitle } from '@tszhong0411/ui'
import { CheckCircle2Icon } from 'lucide-react'

const AlertDemo = () => {
  return (
    <Alert className='max-w-md'>
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
    </Alert>
  )
}

export default AlertDemo

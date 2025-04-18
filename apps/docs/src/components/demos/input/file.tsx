import { Input, Label } from '@tszhong0411/ui'

const InputFileDemo = () => {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='picture'>Picture</Label>
      <Input id='picture' type='file' />
    </div>
  )
}

export default InputFileDemo

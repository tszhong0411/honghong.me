import { Checkbox, Label } from '@tszhong0411/ui'

const LabelDemo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  )
}

export default LabelDemo

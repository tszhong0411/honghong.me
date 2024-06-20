import { Checkbox, Label } from '@tszhong0411/ui'

const CheckboxDisabled = () => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id='terms-2' disabled />
      <Label htmlFor='terms-2'>Accept terms and conditions</Label>
    </div>
  )
}

export default CheckboxDisabled

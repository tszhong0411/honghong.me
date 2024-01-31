import { Checkbox as UICheckbox } from '../ui/checkbox'

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { checked } = props

  return (
    <UICheckbox
      className='pointer-events-none m-0 mr-2 align-middle'
      checked={checked}
    />
  )
}

export default Checkbox

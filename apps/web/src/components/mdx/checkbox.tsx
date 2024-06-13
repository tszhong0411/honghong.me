import { Checkbox as UICheckbox } from '@tszhong0411/ui'

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { checked } = props

  return <UICheckbox className='pointer-events-none m-0 mr-2 align-middle' checked={checked} />
}

export default Checkbox

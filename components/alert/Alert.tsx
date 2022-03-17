import cn from 'classnames'
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'

import { AlertBgColor, AlertIconType, AlertType } from './types'

export const Alert = (props: AlertType) => {
  // const { variant, severity } = props
  const { severity, children } = props

  const bgColor: AlertBgColor = {
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500',
    success: 'bg-green-500',
  }

  const icon: AlertIconType = {
    error: <BiErrorCircle />,
    warning: <AiOutlineWarning />,
    info: <AiOutlineInfoCircle />,
    success: <AiOutlineCheckCircle />,
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-md px-4 py-2 text-sm font-medium leading-5 text-white',
        bgColor[severity]
      )}
    >
      <div className="mr-3 flex justify-center py-2 text-2xl opacity-90">{icon[severity]}</div>
      {children}
    </div>
  )
}

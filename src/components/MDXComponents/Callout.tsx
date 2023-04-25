import clsx from 'clsx'

import { WithChildren } from '@/types'

const Icon = {
  default: '💡',
  error: '🚫',
  info: 'ℹ️',
  warning: '⚠️',
}

type CalloutType = keyof typeof Icon

const classes: Record<CalloutType, string> = {
  default: clsx('border-orange-400/30 bg-orange-400/20 text-orange-300'),
  error: clsx('border-red-200/30 bg-red-900/30 text-red-200'),
  info: clsx('border-blue-200/30 bg-blue-900/30 text-blue-200'),
  warning: clsx('border-yellow-200/30 bg-yellow-700/30 text-yellow-200'),
}

type CalloutProps = {
  type?: CalloutType
  icon?: string
} & WithChildren

const Callout = (props: CalloutProps) => {
  const { children, type = 'default', icon = Icon[type] } = props

  return (
    <div
      className={clsx(
        'mt-6 flex items-center rounded-lg border py-2 pr-4',
        classes[type]
      )}
    >
      <div
        className={clsx('pl-3 pr-2', {
          ['font-emoji']: typeof icon === 'string',
        })}
      >
        {icon}
      </div>
      <div className='w-full min-w-0 leading-7 [&>p]:m-0'>{children}</div>
    </div>
  )
}

export default Callout

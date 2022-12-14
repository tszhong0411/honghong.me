import clsx from 'clsx'
import React from 'react'

import { WithChildren } from '@/types'

const Icon = {
  default: '💡',
  error: '🚫',
  info: 'ℹ️',
  warning: '⚠️',
}

type CalloutType = keyof typeof Icon

const classes: Record<CalloutType, string> = {
  default: clsx(
    'border-orange-100 bg-orange-50 text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/20 dark:text-orange-300'
  ),
  error: clsx(
    'border-red-200 bg-red-100 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-200'
  ),
  info: clsx(
    'border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-200'
  ),
  warning: clsx(
    'border-yellow-100 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-700/30 dark:text-yellow-200'
  ),
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

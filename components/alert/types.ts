import { ReactNode } from 'react'

export type AlertType = {
  // variant: 'filled'
  severity: 'error' | 'warning' | 'info' | 'success'
  children: ReactNode
}

export type AlertBgColor = {
  error: string
  warning: string
  info: string
  success: string
}

export type AlertIconType = {
  error: JSX.Element
  warning: JSX.Element
  info: JSX.Element
  success: JSX.Element
}

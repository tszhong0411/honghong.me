import { ReactNode } from 'react'

export type NoteType = {
  // variant: 'filled'
  severity: 'error' | 'warning' | 'info' | 'success'
  children: ReactNode
}

export type NoteBgColor = {
  error: string
  warning: string
  info: string
  success: string
}

export type NoteIconType = {
  error: JSX.Element
  warning: JSX.Element
  info: JSX.Element
  success: JSX.Element
}

import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const clsxm = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes))
}

export default clsxm

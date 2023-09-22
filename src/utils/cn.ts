import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with tailwind classes.
 * @param inputs - Class names.
 * @returns Merged class names.
 */
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export default cn

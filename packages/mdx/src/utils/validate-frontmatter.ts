import type { Field, Fields } from '@/types'

type ValidationError = {
  field: string
  expected: string
  received: string
}

const validateField = (field: Field, value: unknown): boolean => {
  switch (field.type) {
    case 'string': {
      return typeof value === 'string'
    }
    case 'boolean': {
      return typeof value === 'boolean'
    }
    case 'list': {
      return Array.isArray(value)
    }
    case 'nested': {
      return typeof value === 'object' && value !== null
    }
    default: {
      return false
    }
  }
}

export const validateFrontmatter = (
  data: Record<string, unknown>,
  fields: Fields
): ValidationError[] => {
  const errors: ValidationError[] = []

  for (const field of fields) {
    const value = data[field.name]

    if (field.required && (value === undefined || value === null)) {
      errors.push({
        field: field.name,
        expected: field.type,
        received: 'undefined'
      })
      continue
    }

    if (value !== undefined && !validateField(field, value)) {
      errors.push({
        field: field.name,
        expected: field.type,
        received: typeof value
      })
    }
  }

  return errors
}

import type { Collection, Field, NestedField } from '@/types'

const collectNestedFields = (field: Field): NestedField[] => {
  const nestedFields: NestedField[] = []

  if (field.type === 'nested') {
    nestedFields.push(field)

    for (const innerField of field.of.fields) {
      nestedFields.push(...collectNestedFields(innerField))
    }
  }

  return nestedFields
}

export const getNestedFields = (collections: Collection[]): NestedField[] => {
  const nestedFields: NestedField[] = []

  for (const collection of collections) {
    if (collection.fields) {
      for (const field of collection.fields) {
        nestedFields.push(...collectNestedFields(field))
      }
    }
  }

  return nestedFields
}

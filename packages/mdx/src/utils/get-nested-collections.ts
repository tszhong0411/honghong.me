import type { Collection, ListField } from '@/types'

export const getNestedCollections = (collections: Collection[]): ListField[] => {
  const nestedCollections = []

  for (const collection of collections) {
    if (collection.fields) {
      for (const field of collection.fields) {
        if (field.type === 'list') {
          nestedCollections.push(field)
        }
      }
    }
  }

  return nestedCollections
}

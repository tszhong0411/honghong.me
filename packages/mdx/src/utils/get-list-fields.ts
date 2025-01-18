import type { Collection, ListField } from '@/types'

export const getListFields = (collections: Collection[]): ListField[] => {
  const listFields = []

  for (const collection of collections) {
    if (collection.fields) {
      for (const field of collection.fields) {
        if (field.type === 'list') {
          listFields.push(field)
        }
      }
    }
  }

  return listFields
}

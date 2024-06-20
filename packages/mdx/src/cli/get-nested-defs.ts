import type { DocumentType, ListFieldDef } from '@/types'

export const getNestedDefs = (defs: DocumentType[]): ListFieldDef[] => {
  const nestedDefs = []

  for (const def of defs) {
    if (def.fields) {
      for (const field of def.fields) {
        if (field.type === 'list') {
          nestedDefs.push(field)
        }
      }
    }
  }

  return nestedDefs
}

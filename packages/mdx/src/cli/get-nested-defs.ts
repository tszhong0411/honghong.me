import type { DocumentType, ListFieldDef } from '../source-files'

export const getNestedDefs = (defs: DocumentType[]): ListFieldDef[] => {
  const nestedDefs = []

  for (const def of defs) {
    if (def.fields) {
      for (const field of def.fields) {
        if (field.type === 'list' && field.fields) {
          nestedDefs.push(field)
        }
      }
    }
  }

  return nestedDefs
}

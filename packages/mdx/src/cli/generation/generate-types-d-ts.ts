import { Project, QuoteKind, ts } from 'ts-morph'

import type { DocumentType, FieldDefs } from '@/types'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '../constants'
import { getNestedDefs } from '../get-nested-defs'
import { capitalizeFirstChar } from '../utils'

const renderFields = (fields: FieldDefs) => {
  let result = ''

  for (const field of fields) {
    switch (field.type) {
      case 'boolean':
      case 'string': {
        result += `${field.name}: ${field.type};`
        break
      }
      case 'list': {
        result += `${field.name}: ${capitalizeFirstChar(field.name)}[];`
        break
      }
    }
  }

  return result
}

export const generateTypesDts = async (defs: DocumentType[]) => {
  const nestedDefs = getNestedDefs(defs)

  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  })

  const sourceFile = project.createSourceFile(`${BASE_FOLDER_PATH}/types.d.ts`, undefined, {
    overwrite: true
  })

  sourceFile.addTypeAliases(
    defs.map((def, i) => ({
      name: def.name,
      type: `{ ${def.fields ? renderFields(def.fields) : ''} body: string; slug: string; slugAsParams: string; }`,
      isExported: true,
      ...(i === 0 && {
        leadingTrivia: AUTO_GENERATED_NOTE
      })
    }))
  )

  if (nestedDefs.length > 0) {
    sourceFile.addTypeAliases(
      nestedDefs.map((def) => ({
        name: capitalizeFirstChar(def.name),
        type: `{ ${renderFields(def.fields)} }`,
        isExported: true
      }))
    )
  }

  sourceFile.addTypeAlias({
    name: 'DocumentTypes',
    type: defs.map((def) => def.name).join(' | '),
    isExported: true
  })

  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    semicolons: ts.SemicolonPreference.Remove
  })

  await sourceFile.save()
}

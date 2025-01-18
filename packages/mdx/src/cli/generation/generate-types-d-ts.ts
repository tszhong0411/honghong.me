import { Project, QuoteKind, ts } from 'ts-morph'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '@/cli/constants'
import { getNestedCollections } from '@/cli/get-nested-collections'
import type { Collection, Fields } from '@/types'
import type { ComputedFields } from '@/types/config'
import { capitalize } from '@/utils/capitalize'

const renderComputedFields = (computedFields: ComputedFields): string => {
  const types = []

  for (const field of computedFields) {
    types.push(`${field.name}: ${field.type}`)
  }

  return types.join('\n')
}

const renderFields = (fields: Fields): string => {
  const types = []

  for (const field of fields) {
    switch (field.type) {
      case 'boolean':
      case 'string': {
        types.push(`${field.name}: ${field.type}`)
        break
      }
      case 'list': {
        types.push(`${field.name}: ${capitalize(field.name)}[]`)
        break
      }
    }
  }

  return types.join('\n')
}

export const generateTypesDts = async (collections: Collection[]) => {
  const nestedCollections = getNestedCollections(collections)

  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  })

  const sourceFile = project.createSourceFile(`${BASE_FOLDER_PATH}/types.d.ts`, undefined, {
    overwrite: true
  })

  sourceFile.addTypeAliases(
    collections.map((collection, i) => ({
      name: collection.name,
      type: `\
{
  ${collection.fields ? renderFields(collection.fields) : ''}
  ${collection.computedFields ? renderComputedFields(collection.computedFields) : ''}
  code: string;
  raw: string;
  fileName: string;
  filePath: string;
}`,
      isExported: true,
      ...(i === 0 && {
        leadingTrivia: AUTO_GENERATED_NOTE
      })
    }))
  )

  if (nestedCollections.length > 0) {
    sourceFile.addTypeAliases(
      nestedCollections.map((collection) => ({
        name: capitalize(collection.name),
        type: `\
{
  ${renderFields(collection.fields)}
}`,
        isExported: true
      }))
    )
  }

  sourceFile.addTypeAlias({
    name: 'DocumentTypes',
    type: collections.map((collection) => collection.name).join(' | '),
    isExported: true
  })

  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    semicolons: ts.SemicolonPreference.Remove
  })

  await sourceFile.save()
}

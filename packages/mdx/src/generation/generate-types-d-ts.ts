import type { Collection, Fields } from '@/types'
import type { ComputedFields } from '@/types/config'

import { Project, QuoteKind, ts } from 'ts-morph'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '@/constants'
import { capitalize } from '@/utils/capitalize'
import { getListFields } from '@/utils/get-list-fields'
import { getNestedFields } from '@/utils/get-nested-fields'

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
        types.push(`${field.name}${field.required ? '' : '?'}: ${field.type}`)
        break
      }
      case 'list': {
        types.push(`${field.name}${field.required ? '' : '?'}: ${capitalize(field.name)}[]`)
        break
      }
      case 'nested': {
        types.push(`${field.name}${field.required ? '' : '?'}: ${capitalize(field.name)}`)
        break
      }
    }
  }

  return types.join('\n')
}

export const generateTypesDts = async (collections: Collection[]) => {
  const listFields = getListFields(collections)
  const nestedFields = getNestedFields(collections)

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
          toc: Array<{
            title: string
            url: string
            depth: number
          }>;
        }
      `,
      isExported: true,
      ...(i === 0 && {
        leadingTrivia: AUTO_GENERATED_NOTE
      })
    }))
  )

  if (listFields.length > 0) {
    sourceFile.addTypeAliases(
      listFields.map((listField) => ({
        name: capitalize(listField.name),
        type: `\
          {
            ${renderFields(listField.fields)}
          }
        `,
        isExported: true
      }))
    )
  }

  if (nestedFields.length > 0) {
    sourceFile.addTypeAliases(
      nestedFields.map((nestedField) => ({
        name: capitalize(nestedField.name),
        type: `\
          {
            ${renderFields(nestedField.of.fields)}
          }
        `,
        isExported: true
      }))
    )
  }

  sourceFile.addTypeAlias({
    name: 'Collection',
    type: collections.map((collection) => collection.name).join(' | '),
    isExported: true
  })

  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    semicolons: ts.SemicolonPreference.Remove
  })

  await sourceFile.save()
}

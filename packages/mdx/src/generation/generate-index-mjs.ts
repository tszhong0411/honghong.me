import type { Collection } from '@/types'

import pluralize from 'pluralize'
import { Project, QuoteKind, ts, VariableDeclarationKind } from 'ts-morph'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '@/constants'

export const generateIndexMjs = async (collections: Collection[]) => {
  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  })

  const sourceFile = project.createSourceFile(`${BASE_FOLDER_PATH}/index.mjs`, undefined, {
    overwrite: true
  })

  sourceFile.addImportDeclarations(
    collections.map((collection, i) => ({
      defaultImport: `all${pluralize(collection.name)}`,
      moduleSpecifier: `./${collection.name}/index.json`,
      ...(i === 0 && {
        leadingTrivia: AUTO_GENERATED_NOTE
      })
    }))
  )

  sourceFile.addExportDeclaration({
    namedExports: collections.map((collection) => `all${pluralize(collection.name)}`)
  })

  const allCollections = collections
    .map((collection) => `...all${pluralize(collection.name)}`)
    .join(', ')

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'allCollections',
        initializer: `[${allCollections}]`
      }
    ],
    isExported: true
  })

  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    semicolons: ts.SemicolonPreference.Remove
  })

  await sourceFile.save()
}

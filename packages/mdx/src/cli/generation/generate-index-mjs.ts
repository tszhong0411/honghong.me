import pluralize from 'pluralize'
import { Project, QuoteKind, ts, VariableDeclarationKind } from 'ts-morph'

import type { DocumentType } from '@/types'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '../constants'

export const generateIndexMjs = async (defs: DocumentType[]) => {
  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  })

  const sourceFile = project.createSourceFile(`${BASE_FOLDER_PATH}/index.mjs`, undefined, {
    overwrite: true
  })

  sourceFile.addImportDeclarations(
    defs.map((def, i) => ({
      defaultImport: `all${pluralize(def.name)}`,
      moduleSpecifier: `./${def.name}/index.json`,
      ...(i === 0 && {
        leadingTrivia: AUTO_GENERATED_NOTE
      })
    }))
  )

  sourceFile.addExportDeclaration({
    namedExports: defs.map((def) => `all${pluralize(def.name)}`)
  })

  const allDocuments = defs.map((def) => `...all${pluralize(def.name)}`).join(', ')

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'allDocuments',
        initializer: `[${allDocuments}]`
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

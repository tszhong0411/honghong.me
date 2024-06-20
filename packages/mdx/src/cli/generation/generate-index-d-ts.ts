import pluralize from 'pluralize'
import { Project, QuoteKind, ts, VariableDeclarationKind } from 'ts-morph'

import type { DocumentType } from '@/types'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '../constants'

export const generateIndexDts = async (defs: DocumentType[]) => {
  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  })

  const sourceFile = project.createSourceFile(`${BASE_FOLDER_PATH}/index.d.ts`, undefined, {
    overwrite: true
  })

  sourceFile.addImportDeclaration({
    namedImports: [...defs.map((def) => def.name), 'DocumentTypes'],
    moduleSpecifier: './types',
    leadingTrivia: AUTO_GENERATED_NOTE
  })

  sourceFile.addExportDeclaration({
    moduleSpecifier: './types'
  })

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      ...defs.map((def) => ({
        name: `all${pluralize(def.name)}`,
        type: `${def.name}[]`
      })),
      {
        name: 'allDocuments',
        type: 'DocumentTypes[]'
      }
    ],
    hasDeclareKeyword: true,
    isExported: true
  })

  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    semicolons: ts.SemicolonPreference.Remove
  })

  await sourceFile.save()
}

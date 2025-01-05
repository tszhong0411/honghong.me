import type { PluggableList } from 'unified'

export type DocumentMetadata = {
  raw: string
  code: string
  fileName: string
  filePath: string
  [key: string]: unknown
}

export type ComputedField = {
  name: string
  type: 'string' | 'boolean' | 'list'
  resolve: (doc: DocumentMetadata) => unknown
}

export type ComputedFields = ComputedField[]

export type DocumentType = {
  name: string
  filePathPattern: string
  fields?: FieldDefs
  computedFields?: ComputedFields
}

export type BaseFieldDef = {
  name: string
  type: 'string' | 'boolean' | 'list'
  required?: boolean
}

export type StringFieldDef = BaseFieldDef & {
  type: 'string'
  fields?: FieldDefs
}

export type BooleanFieldDef = BaseFieldDef & {
  type: 'boolean'
  fields?: FieldDefs
}

export type ListFieldDef = BaseFieldDef & {
  type: 'list'
  fields: FieldDefs
}

export type FieldDef = StringFieldDef | BooleanFieldDef | ListFieldDef

export type FieldDefs = FieldDef[]

export type MakeSourceOptions = {
  contentDirPath: string
  defs: DocumentType[]
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
}

export type DocumentType = {
  name: string
  filePathPattern: string
  fields?: FieldDefs
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
}

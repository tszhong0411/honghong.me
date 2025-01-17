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

export type Collection = {
  name: string
  filePathPattern: string
  fields?: Fields
  computedFields?: ComputedFields
}

export type BaseField = {
  name: string
  type: 'string' | 'boolean' | 'list'
  required?: boolean
}

export type StringField = BaseField & {
  type: 'string'
  fields?: Fields
}

export type BooleanField = BaseField & {
  type: 'boolean'
  fields?: Fields
}

export type ListField = BaseField & {
  type: 'list'
  fields: Fields
}

export type Field = StringField | BooleanField | ListField

export type Fields = Field[]

export type Config = {
  contentDirPath: string
  collections: Collection[]
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
}

export const defineCollection = <T extends Collection>(collection: T) => collection
export const defineConfig = <T extends Config>(config: T) => config

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

export type UserConfig<T extends Collection[] = Collection[]> = {
  contentDirPath: string
  collections: T
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
}

export type Config = {
  cache: Map<string, Record<string, unknown>>
} & UserConfig

export const defineCollection = <T extends Collection>(collection: T) => collection
export const defineConfig = <T extends UserConfig>(config: T) => config

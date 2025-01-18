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
  type: 'string' | 'boolean' | 'list' | 'nested'
  required?: boolean
}

export type StringField = {
  type: 'string'
} & BaseField

export type BooleanField = {
  type: 'boolean'
} & BaseField

export type ListField = {
  type: 'list'
  fields: Fields
} & BaseField

export type NestedField = {
  type: 'nested'
  of: {
    fields: Fields
  }
} & BaseField

export type Field = StringField | BooleanField | ListField | NestedField

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

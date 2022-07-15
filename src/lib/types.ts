import { Blog } from 'contentlayer/generated'
import React from 'react'

export type ChildrenType = {
  children: React.ReactNode
}

export type ProjectDetail = {
  title: string
  description: string
  href: string
}

export type ProjectData = {
  [key: string]: ProjectDetail[]
}

export type PcSpecsType = {
  name: string
  content: string
}

export type I18nConfigType = {
  locales: string[]
  defaultLocale: string
  languages: {
    [key: string]: {
      name: string
      flag: string
    }
  }
}

export type PostsListProps = {
  post: Blog | Omit<Blog, 'body' | '_raw' | '_id'>
}

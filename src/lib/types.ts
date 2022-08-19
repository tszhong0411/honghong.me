import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Literal, Parent } from 'unist'

export type ProjectData = {
  [key: string]: {
    title: string
    description: string
    href: string
  }[]
}

export type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
}

export type PostItems = {
  [key: string]: string
}

export type PostFrontMatter = {
  title: string
  date: string
  modifiedTime: string
  summary: string
  image: string
  slug: string
  views?: string
}

export type PageFrontMatter = {
  title: string
  description: string
  slug: string
}

export type PostProps = {
  source: MDXRemoteSerializeResult
  frontMatter: PostFrontMatter
}

export type BlogPostProps = {
  post: PostProps
  ogImage: string
}

export type FileType = 'blog' | 'page'

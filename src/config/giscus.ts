import { GiscusProps } from '@giscus/react'

const GISCUS_CONFIG: GiscusProps = {
  repo: 'tszhong0411/honghong.me',
  repoId: 'R_kgDOGxHFnA',
  category: 'Blog Comments',
  categoryId: 'DIC_kwDOGxHFnM4CBGIQ',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '1',
  inputPosition: 'bottom',
  lang: 'en',
  loading: 'eager'
} as const

export default GISCUS_CONFIG

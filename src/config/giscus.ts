import { type GiscusProps } from '@giscus/react'

import { env } from '@/env'

const GISCUS_CONFIG: GiscusProps = {
  repo: env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`,
  repoId: env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
  category: env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '1',
  inputPosition: 'bottom',
  lang: 'en',
  loading: 'eager'
} as const

export default GISCUS_CONFIG

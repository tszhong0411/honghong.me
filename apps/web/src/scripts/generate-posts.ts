import fs from 'node:fs'
import path from 'node:path'

import { type BlogMetadata, getAllPages } from '@/lib/mdx'
import { dayjs } from '@/utils/dayjs'

const posts = getAllPages<BlogMetadata>('blog')

if (posts.length > 0) {
  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'app', 'og', '[id]', 'posts.json'),
    `${JSON.stringify(
      posts.map((p) => ({
        title: p.title,
        slug: p.slug,
        date: dayjs(p.date).format('MMMM DD, YYYY')
      })),
      null,
      2
    )}\n`
  )

  console.log('Generated posts.json')
}

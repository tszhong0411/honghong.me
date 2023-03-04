import {
  IconBrandFacebook,
  IconBrandReddit,
  IconBrandTwitter,
} from '@tabler/icons-react'

import Link from '@/components/Link'

const editURL = (slug: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/src/content/blog/${slug}.mdx`

const twitterShareURL = (slug: string, title: string) =>
  `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const facebookShareURL = (slug: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const redditShareURL = (slug: string, title: string) =>
  `https://www.reddit.com/submit?title=${title}&url=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

type FooterProps = {
  slug: string
  title: string
}

const Footer = (props: FooterProps) => {
  const { slug, title } = props

  return (
    <div className='my-8  flex w-full items-center justify-between border-t border-b border-accent-2 py-4'>
      <Link href={editURL(slug)} className='text-sm'>
        在 GitHub 上編輯
      </Link>
      <div className='flex items-center justify-center gap-2'>
        <Link
          href={redditShareURL(slug, title)}
          icon={false}
          animation={false}
          className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent-2'
        >
          <IconBrandReddit size={18} />
        </Link>
        <Link
          href={twitterShareURL(slug, title)}
          icon={false}
          animation={false}
          className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent-2'
        >
          <IconBrandTwitter size={18} />
        </Link>
        <Link
          href={facebookShareURL(slug)}
          icon={false}
          animation={false}
          className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent-2'
        >
          <IconBrandFacebook size={18} />
        </Link>
      </div>
    </div>
  )
}

export default Footer

import { Link } from '@tszhong0411/ui'
import { EditIcon } from 'lucide-react'

type EditOnGitHubProps = {
  path: string
}

const EditOnGitHub = (props: EditOnGitHubProps) => {
  const { path } = props

  const url = `https://github.com/tszhong0411/honghong.me/blob/main/apps/docs/src/content/${path}.mdx`

  return (
    <Link href={url} className='inline-flex items-center gap-2 text-sm font-medium' variant='muted'>
      <EditIcon className='size-4' />
      Edit this page on GitHub
    </Link>
  )
}

export default EditOnGitHub

import { IconLoader2 } from '@tabler/icons-react'

const CommentsLoading = () => {
  return (
    <div className='flex min-h-48 flex-col items-center justify-center gap-4'>
      <IconLoader2 className='animate-spin' />
      <p>Loading comments...</p>
    </div>
  )
}

export default CommentsLoading

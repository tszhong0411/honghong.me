import { Loader2Icon } from 'lucide-react'

const CommentsLoading = () => {
  return (
    <div className='flex min-h-48 flex-col items-center justify-center gap-4'>
      <Loader2Icon className='animate-spin' />
      <p>Loading comments...</p>
    </div>
  )
}

export default CommentsLoading

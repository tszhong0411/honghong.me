import Link from 'next/link'

export const metadata = {
  title: '404',
}

const NotFound = () => {
  return (
    <div className='mt-52 mb-40 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>404 Page Not Found</h1>
      <Link
        href='/'
        className='rounded-lg border border-accent-2 px-3 py-2 transition-colors duration-300'
      >
        回到首頁
      </Link>
    </div>
  )
}

export default NotFound

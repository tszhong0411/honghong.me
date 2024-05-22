import { Logo as HongLogo } from '@tszhong0411/ui'

const Logo = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='flex h-52 w-full items-center justify-center rounded-lg bg-white'>
        <HongLogo className='text-black' width={48} height={48} />
      </div>
      <div className='flex h-52 w-full items-center justify-center rounded-lg bg-black'>
        <HongLogo className='text-white' width={48} height={48} />
      </div>
    </div>
  )
}

export default Logo

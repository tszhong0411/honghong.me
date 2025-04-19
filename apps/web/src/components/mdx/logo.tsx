import { Logo as NelsonLogo } from '@tszhong0411/ui'

const Logo = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='flex h-52 w-full items-center justify-center rounded-lg bg-white'>
        <NelsonLogo className='text-black' width={48} height={48} />
      </div>
      <div className='flex h-52 w-full items-center justify-center rounded-lg bg-black'>
        <NelsonLogo className='text-white' width={48} height={48} />
      </div>
    </div>
  )
}

export default Logo

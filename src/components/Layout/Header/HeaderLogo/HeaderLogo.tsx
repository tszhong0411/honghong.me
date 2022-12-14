import Link from 'next/link'

import Logo from '@/components/Logo'

const HeaderLogo = () => {
  return (
    <Link href='/' className='flex items-center justify-center gap-1'>
      <Logo
        width={28}
        height={28}
        className='fill-[#8b1d1d] dark:fill-[#c92a2a]'
      />
      <span className='leading-7'>小康</span>
    </Link>
  )
}

export default HeaderLogo

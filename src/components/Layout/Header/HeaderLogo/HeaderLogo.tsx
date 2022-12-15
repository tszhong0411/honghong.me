import Link from 'next/link'

import Logo from '@/components/Logo'

const HeaderLogo = () => {
  return (
    <Link href='/' className='flex items-center justify-center gap-1'>
      <Logo width={28} height={28} />
    </Link>
  )
}

export default HeaderLogo

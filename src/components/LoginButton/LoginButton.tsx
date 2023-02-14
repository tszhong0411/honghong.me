'use client'

import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'
import clsx from 'clsx'
import { ClientSafeProvider, signIn } from 'next-auth/react'

type LoginButtonProps = {
  provider: ClientSafeProvider
}

type Type = {
  [key: string]: {
    icon: React.ReactNode
    className: string
  }
}

const type: Type = {
  github: {
    icon: <IconBrandGithub size={20} />,
    className: 'bg-[#24292e] hover:bg-[#555] text-white',
  },
  google: {
    icon: <IconBrandGoogle size={20} />,
    className: 'bg-[#3e7ee8] hover:bg-[#6c99e3] text-white',
  },
}

const LoginButton = (props: LoginButtonProps) => {
  const { provider } = props
  const { name, id } = provider

  return (
    <button
      onClick={() => signIn(id)}
      className={clsx(
        'flex h-12 w-full items-center justify-center gap-2 rounded-lg transition-colors duration-300',
        type[id].className
      )}
    >
      {type[id].icon}
      Continue with {name}
    </button>
  )
}

export default LoginButton

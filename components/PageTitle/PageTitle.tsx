import { ReactNode } from 'react'
interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return <h1 className="mb-6 text-3xl font-bold md:text-5xl">{children}</h1>
}

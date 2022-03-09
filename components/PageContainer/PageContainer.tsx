import { useRouter } from 'next/router'

export default function PageContainer(props) {
  const { title, description, children } = props
  const router = useRouter()

  return (
    <div className="mx-auto flex flex-col justify-center">
      <h1 className="mb-6 text-3xl font-bold md:text-5xl">{title}</h1>
      {description && <p className="mb-12">{description[router.locale]}</p>}
      <div className="max-w-full pb-12">
        <div>{children}</div>
      </div>
    </div>
  )
}

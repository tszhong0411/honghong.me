import { getErrorMessage } from '@tszhong0411/utils'

type PageProps = {
  params: Promise<Record<string, never>>
  searchParams: Promise<{
    component: string
  }>
}

const Page = async (props: PageProps) => {
  const { component } = await props.searchParams

  try {
    const Component = (await import(`@/components/demos/${component}`)).default

    return <Component />
  } catch (error) {
    return <div>Error: {getErrorMessage(error)}</div>
  }
}

export default Page

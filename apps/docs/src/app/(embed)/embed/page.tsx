import { getErrorMessage } from '@tszhong0411/utils'

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const Page = async (props: PageProps) => {
  const { component } = await props.searchParams

  if (!component || typeof component !== 'string') {
    return <div>Error: Invalid component name</div>
  }

  try {
    const Component = (await import(`@/components/demos/${component}`)).default

    return <Component />
  } catch (error) {
    return <div>Error: {getErrorMessage(error)}</div>
  }
}

export default Page

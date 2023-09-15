import site from '@/config/site'

const fetcher = async <JSON>(
  input: string,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(`${site.url}${input}`, init)
  return res.json() as Promise<JSON>
}

export default fetcher

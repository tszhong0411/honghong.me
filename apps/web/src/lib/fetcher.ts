import { WEBAPP_URL } from './constants'

const fetcher = async <JSON>(
  input: string,
  init?: RequestInit
): Promise<JSON> => {
  const fetchURL =
    process.env.NODE_ENV === 'test' ? `${WEBAPP_URL}${input}` : input

  const res = await fetch(fetchURL, init)
  return res.json() as Promise<JSON>
}

export default fetcher

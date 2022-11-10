// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init)
  return res.json()
}

export default fetcher

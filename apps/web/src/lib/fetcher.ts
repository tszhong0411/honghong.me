export const fetcher = async <JSON>(
  input: string,
  init?: RequestInit
): Promise<JSON> => {
  const fetchURL = input

  const res = await fetch(fetchURL, init)
  return res.json() as Promise<JSON>
}

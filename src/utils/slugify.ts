/**
 * Source: https://github.com/leerob/leerob.io/blob/6ecab76e6dd84000a9bb0156dcd4a3b02f8c7d5d/app/components/mdx.tsx#L120-L129
 */
const slugify = (str: string) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replaceAll(/\s+/g, '-')
    .replaceAll('&', '-and-')
    .replaceAll(/[^\w-]+/g, '')
    .replaceAll(/--+/g, '-')

export default slugify

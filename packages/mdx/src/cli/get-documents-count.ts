export const getDocumentsCount = async (contentDirPath: string) => {
  const { glob } = (await import('fast-glob')).default
  return (await glob(`${contentDirPath}/**/*.mdx`)).length
}

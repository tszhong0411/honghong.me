export const getEntries = async (pattern: string, cwd: string): Promise<string[]> => {
  const { glob } = (await import('fast-glob')).default
  return glob(pattern, { cwd })
}

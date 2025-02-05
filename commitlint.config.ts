import type { UserConfig } from 'cz-git'

import fs from 'node:fs/promises'

const getDirectories = async (source: string) => {
  const directories = await fs.readdir(source, { withFileTypes: true })

  return directories.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)
}

const apps = await getDirectories(`${import.meta.dirname}/apps`)
const packages = await getDirectories(`${import.meta.dirname}/packages`)

const scopes = [...apps, ...packages]

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['release', ...scopes]]
  }
}

export default config

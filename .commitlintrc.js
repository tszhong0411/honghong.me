import fs from 'node:fs/promises'

const getDirectories = async (source) => {
  const directories = await fs.readdir(source, { withFileTypes: true })

  return directories.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)
}

const apps = await getDirectories(`${import.meta.dirname}/apps`)
const packages = await getDirectories(`${import.meta.dirname}/packages`)

const scopes = [...apps, ...packages]

/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['root', 'release', ...scopes]]
  }
}

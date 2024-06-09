import { isPackageExists } from 'local-pkg'

export const hasTypeScript = isPackageExists('typescript')
export const hasTurbo = isPackageExists('turbo')

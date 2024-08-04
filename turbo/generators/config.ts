import { type PlopTypes } from '@turbo/gen'

import { packageGenerator } from './templates/package/generator'

const generators = [packageGenerator]

const generator = (plop: PlopTypes.NodePlopAPI): void => {
  for (const gen of generators) {
    gen(plop)
  }
}

export default generator

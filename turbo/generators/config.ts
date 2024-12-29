import { type PlopTypes } from '@turbo/gen'

import { packageGenerator } from './templates/package/generator'
import { postGenerator } from './templates/post/generator'

const generators = [packageGenerator, postGenerator]

const generator = (plop: PlopTypes.NodePlopAPI): void => {
  for (const gen of generators) {
    gen(plop)
  }
}

export default generator

import { type PlopTypes } from '@turbo/gen'

import { componentGenerator } from './templates/component/generator'
import { packageGenerator } from './templates/package/generator'
import { postGenerator } from './templates/post/generator'
import { capitalize } from './utils'

const generators = [packageGenerator, postGenerator, componentGenerator]

const generator = (plop: PlopTypes.NodePlopAPI): void => {
  for (const gen of generators) {
    gen(plop)
  }

  plop.addHelper('capitalize', capitalize)
}

export default generator

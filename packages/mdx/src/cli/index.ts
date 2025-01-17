import { getErrorMessage } from '@tszhong0411/utils'
import { program } from 'commander'

import { logger } from '@/utils/logger'

import { version } from '../../package.json'
import { build, dev } from './commands'

try {
  program.name('mdx').description('MDX CLI').version(version)

  program.command('build').description('Transforms your content into static data').action(build)

  program.command('dev').description('Same as "mdx build" but with watch mode').action(dev)

  await program.parseAsync()
} catch (error) {
  logger.error(getErrorMessage(error))
}

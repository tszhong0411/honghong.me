import chalk from 'chalk'

type ChalkInstance = typeof chalk

const getMs = (begin?: number) => (begin ? `(${(performance.now() - begin).toFixed(2)}ms)` : '')

const createLogger = (color: ChalkInstance) => (message: string, begin?: number) => {
  console.log(color('[MDX]'), message, getMs(begin))
}

export const logger = {
  info: createLogger(chalk.green),
  warn: createLogger(chalk.yellow),
  error: createLogger(chalk.red)
}

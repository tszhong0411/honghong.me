import chalk from 'chalk'

export const logger = {
  info: (message: string) => {
    console.log(chalk.green('[MDX]'), message)
  },

  warn: (message: string) => {
    console.warn(chalk.yellow('[MDX]'), message)
  },

  error: (message: string) => {
    console.error(chalk.red('[MDX]'), message)
  }
}

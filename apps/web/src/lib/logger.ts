import { consola } from 'consola'

export const logger = consola.create({
  level: process.env.NODE_ENV === 'production' ? -999 : 4
})

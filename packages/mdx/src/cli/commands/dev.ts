import { type ChildProcess, spawn } from 'node:child_process'
import path from 'node:path'

let serverProcess: ChildProcess | undefined

export const dev = () => {
  const startServerPath = path.resolve(import.meta.dirname, 'start-server')

  const cleanUp = () => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill('SIGTERM')
      serverProcess = undefined
    }
  }

  cleanUp()

  serverProcess = spawn(process.execPath, [startServerPath], {
    stdio: 'inherit'
  })

  serverProcess.on('exit', (code) => {
    cleanUp()
    if (code === 99) {
      dev()
    }
  })

  process.on('SIGINT', cleanUp)
  process.on('SIGTERM', cleanUp)
}

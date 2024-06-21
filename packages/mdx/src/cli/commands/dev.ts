import { type ChildProcess, spawn } from 'node:child_process'
import path from 'node:path'

let serverProcess: ChildProcess | undefined

export const dev = () => {
  const startServerPath = path.resolve(import.meta.dirname, 'start-server')

  serverProcess = spawn('node', [startServerPath], {
    stdio: 'inherit'
  })

  serverProcess.on('exit', (code) => {
    if (code === 99) {
      dev()
    }
  })
}

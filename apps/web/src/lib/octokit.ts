import { Octokit } from '@octokit/rest'
import { env } from '@tszhong0411/env'

export const octokit: InstanceType<typeof Octokit> = new Octokit({
  auth: env.GITHUB_TOKEN
})

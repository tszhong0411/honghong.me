import { Octokit } from '@octokit/rest'
import { env } from '@tszhong0411/env'

import { GITHUB_USERNAME } from '@/lib/constants'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const githubRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const octokit = new Octokit({
      auth: env.GITHUB_TOKEN
    })

    const { data: repos } = await octokit.request('GET /users/{username}/repos', {
      username: GITHUB_USERNAME
    })

    const { data: user } = await octokit.request('GET /users/{username}', {
      username: GITHUB_USERNAME
    })

    const stars = repos
      .filter((repo) => {
        return !repo.fork
      })
      .reduce((acc, repo) => {
        return acc + (repo.stargazers_count ?? 0)
      }, 0)

    const followers = user.followers

    return {
      stars,
      followers
    }
  })
})

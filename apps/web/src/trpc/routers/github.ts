import { Octokit } from '@octokit/rest'
import { TRPCError } from '@trpc/server'
import { env } from '@tszhong0411/env'
import { ratelimit } from '@tszhong0411/kv'

import { GITHUB_USERNAME } from '@/lib/constants'
import { getIp } from '@/utils/get-ip'

import { createTRPCRouter, publicProcedure } from '../init'

const getKey = (id: string) => `github:${id}`

export const githubRouter = createTRPCRouter({
  getStats: publicProcedure.query(async ({ ctx }) => {
    const ip = getIp(ctx.headers)

    const { success } = await ratelimit.limit(getKey(ip))

    if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

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
  }),
  getRepoStarCount: publicProcedure.query(async ({ ctx }) => {
    const ip = getIp(ctx.headers)

    const { success } = await ratelimit.limit(getKey(ip))

    if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

    const octokit = new Octokit({
      auth: env.GITHUB_TOKEN
    })

    const { data: repo } = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: GITHUB_USERNAME,
      repo: 'nelsonlai.me'
    })

    return repo.stargazers_count
  })
})

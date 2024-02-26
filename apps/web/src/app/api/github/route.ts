import { Octokit } from '@octokit/rest'
import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'

import { env } from '@/env'
import { GITHUB_USERNAME } from '@/lib/constants'

export const runtime = 'edge'

export const GET = async () => {
  noStore()

  const octokit = new Octokit({
    auth: env.GITHUB_TOKEN
  })

  const { data: repos } = await octokit.request('GET /users/{username}/repos', {
    username: GITHUB_USERNAME
  })

  const {
    data: { followers }
  } = await octokit.request('GET /users/{username}', {
    username: GITHUB_USERNAME
  })

  const stars = repos
    .filter((repo) => {
      return !repo.fork
    })
    .reduce((acc, repo) => {
      return acc + (repo.stargazers_count ?? 0)
    }, 0)

  return NextResponse.json({
    stars,
    followers
  })
}

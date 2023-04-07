import { Octokit } from '@octokit/rest'
import { NextResponse } from 'next/server'

import { site } from '@/config/site'

export const GET = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const { data: repos } = await octokit.request('GET /users/{username}/repos', {
    username: site.githubUsername,
  })

  const {
    data: { followers },
  } = await octokit.request('GET /users/{username}', {
    username: site.githubUsername,
  })

  const stars = repos
    .filter((repo) => !repo.fork)
    .reduce((acc, repo) => {
      return acc + (repo.stargazers_count ?? 0)
    }, 0)

  return NextResponse.json({
    stars,
    followers,
  })
}

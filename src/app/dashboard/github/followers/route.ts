import { Octokit } from '@octokit/rest'
import { NextResponse } from 'next/server'

import { site } from '@/config/site'

export const GET = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const {
    data: { followers },
  } = await octokit.request('GET /users/{username}', {
    username: site.githubUsername,
  })

  return NextResponse.json({
    count: followers,
  })
}

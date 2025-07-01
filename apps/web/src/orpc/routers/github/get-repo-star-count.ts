import { GITHUB_USERNAME } from '@/lib/constants'
import { octokit } from '@/lib/octokit'
import { publicProcedure } from '@/orpc/root'

export const getRepoStarCount = publicProcedure.handler(async () => {
  const { data: repo } = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: GITHUB_USERNAME,
    repo: 'nelsonlai.me'
  })

  return repo.stargazers_count
})

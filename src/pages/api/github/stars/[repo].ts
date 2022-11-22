import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { repo } = req.query

  const repoRequest = await fetch(
    `https://api.github.com/repos/tszhong0411/${repo}`
  )

  const repository = await repoRequest.json()
  const { stargazers_count: stargazers = 0 } = repository

  res.setHeader(
    'cache-control',
    'public, s-maxage=3600, stale-while-revalidate=1800'
  )

  return res.status(200).json({
    stars: stargazers,
  })
}

export default handler

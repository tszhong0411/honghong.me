const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://docs.honghong.me' : 'http://localhost:3002'
export const SITE_TITLE = 'Docs | Nelson Lai - A Full Stack Engineer'
export const SITE_DESCRIPTION =
  "Explore comprehensive documentation and resources for Nelson's projects"
export const SITE_KEYWORDS = [
  'tszhong0411',
  'Web Development',
  'Programming',
  'UI/UX Design',
  'GitHub projects',
  'Documentation'
]

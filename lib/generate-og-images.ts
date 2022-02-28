import { createHash } from 'crypto'
import fs from 'fs'

type OgImageParams = Record<string, string | undefined>

const OGImageDirectory = `./public/static/images/og`
const defaultOGImage = '/static/images/og/og.png'

const getOgImage = async (params: OgImageParams): Promise<string> => {
  const hash = createHash('md5').update(params.slug).digest('hex')
  const imagePath = `${OGImageDirectory}/${hash}.png`
  const publicPath = `/static/images/og/${hash}.png`

  try {
    fs.statSync(imagePath)
    return publicPath
  } catch (error) {
    console.log(error)
    return defaultOGImage
  }
}

export default getOgImage

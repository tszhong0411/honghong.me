import { createHash } from 'crypto'
import fs from 'fs'
import puppeteer from 'puppeteer'

export const getOgImage = async (
  path: string,
  baseUrl = 'https://og-image.honghong.me'
) => {
  const url = `${baseUrl}${path}`
  const hash = createHash('md5').update(url).digest('hex')
  const ogImageDir = `./public/static/images/og`
  const imagePath = `${ogImageDir}/${hash}.png`
  const publicPath = `https://honghong.me/static/images/og/${hash}.png`

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1200,
      height: 630,
    },
  })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })

  const buffer = await page.screenshot({ type: 'png' })
  await browser.close()

  fs.mkdirSync(ogImageDir, { recursive: true })
  fs.writeFileSync(imagePath, buffer)

  return publicPath
}

import puppeteer from 'puppeteer'
import chalk from 'chalk'
import { createHash } from 'crypto'
import fs from 'fs'
import qs from 'qs'

import { allBlogs } from '../.contentlayer/generated/index.mjs'

const ogImageDir = `./public/static/images/og`

;(async () => {
  console.info(chalk.cyan('info'), ` - Generating Opengraph images`)
  if (process.env.NODE_ENV === 'development') {
    console.info(
      chalk.yellow('warn'),
      ` - Opengraph images will only be generated in production build`
    )
    return
  }

  for (let index = 0; index < allBlogs.length; index++) {
    const post = allBlogs[index]
    const hash = createHash('md5').update(post.slug).digest('hex')
    const imagePath = `${ogImageDir}/${hash}.png`

    const params = {
      title: post.title,
      background: post.colorFeatured,
      color: post.fontFeatured,
    }

    const filteredParams = Object.keys(params).reduce((acc, curr) => {
      if (!params[curr] || params[curr] === 'undefined') {
        return acc
      }
      return {
        ...acc,
        [curr]: params[curr],
      }
    }, {})

    const url = `https://og-image.honghong.me/honghong.me/post?${qs.stringify(filteredParams)}`

    try {
      fs.statSync(imagePath)
    } catch (error) {
      console.info(chalk.yellowBright(`Generating Opengraph image for ${post.title}`))

      try {
        const browser = await puppeteer.launch({
          defaultViewport: {
            width: 1200,
            height: 630,
          },
        })
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })

        const buffer = await page.screenshot({ type: 'png' })
        await browser.close()

        fs.mkdirSync(ogImageDir, { recursive: true })
        fs.writeFileSync(imagePath, buffer)
      } catch (error) {
        console.error(
          chalk.red('error'),
          ` - An error occurred while generating the Opengraph image for ${post.title}`
        )
        console.error(error)
        process.exit(1)
      }
    }
  }
})()

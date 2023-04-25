/* eslint-disable no-console */
import chalk from 'chalk'
import fs from 'fs'
import puppeteer from 'puppeteer'

import { allBlogPosts } from '../../.contentlayer/generated/index.mjs'

const OG_IMAGE_PATH = './public/static/images/og/posts'
const OG_IMAGE_WEBSITE = 'https://og-image.honghong.me'

;(async () => {
  for (let i = 0; i < allBlogPosts.length; i++) {
    const post = allBlogPosts[i]

    console.info(
      chalk.yellowBright(`Generating Opengraph image for ${post.title}`)
    )

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: {
          width: 1200,
          height: 630,
        },
        args: ['--no-sandbox'],
      })

      const page = await browser.newPage()

      await page.goto(
        `${OG_IMAGE_WEBSITE}/website?title=${post.title}&date=${post.date}`,
        { waitUntil: 'networkidle0' }
      )

      const buffer = await page.screenshot({ type: 'png' })
      await browser.close()

      fs.mkdirSync(OG_IMAGE_PATH, { recursive: true })
      fs.writeFileSync(`${OG_IMAGE_PATH}/${post.slug}.png`, buffer)
    } catch (error) {
      console.error(
        chalk.red('error'),
        ` - An error occurred while generating the Opengraph image for ${post.title}`
      )
      console.error(error)
      process.exit(1)
    }
  }
})()

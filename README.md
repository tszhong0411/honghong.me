<p align="center">
  <img alt="" src="https://honghong.me/images/projects/blog/cover.png">
</p>

<h1 align="center">
  honghong.me
</h1>

<p align="center">
  <a aria-label="Framework" href="https://nextjs.org">
    <img alt="" src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&labelColor=000">
  </a>
  <img alt="" src="https://img.shields.io/github/languages/top/tszhong0411/honghong.me?style=for-the-badge&labelColor=000">
  <a aria-label="License" href="https://github.com/tszhong0411/honghong.me/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/github/license/tszhong0411/honghong.me?style=for-the-badge&labelColor=000">
  </a>
</p>

Welcome to the monorepo of my personal blog! This repository houses the code for my blog, where I share my thoughts, projects, and insights. Feel free to explore and get inspired.

## ✨ Features

- ⚡️ Next.js 14 with App Router (Turbo)
- 📝 MDX
- 🎨 Tailwind CSS - for styling
- 🌈 Radix UI - accessible UI components
- 🛡 Strict TypeScript and ESLint configuration
- 📱 Responsive design
- 🌗 Light / Dark mode
- 📈 SEO optimized with meta tags and JSON-LD
- 📰 RSS feed
- 🗺 Sitemap
- 📊 Umami Analytics
- 📝 Blog with comments, likes, and post views
- 🔎 Blog post search
- 📖 Table of contents for blog posts
- 📷 Image zoom - zoom in on images in blog posts
- 📝 Code syntax highlighting - using Shiki
- 🎨 Animation - using Framer Motion
- 🤖 GitHub Actions for CI/CD
- 🏠 LightHouse score of nearly 100
- 🔨 Husky & Lint Staged - lint and format code before committing
- ✅ Conventional commit lint - make sure commit messages follow the conventional commit format
- 🔒 NextAuth.js - authentication
- 💄 Prettier - code formatting
- 〰️ Drizzle - ORM
- 👷🏻‍♂️ t3-env - validate environment variables before building

## 🔨 Requirements

- Node, recommended `20.x`
- pnpm, recommended `9.x`
- PostgreSQL, recommended `14.x` (optional if you don't need all the functionalities)
- [Visual Studio Code](https://code.visualstudio.com/) with [recommended extensions](.vscode/extensions.json)
- Optionally [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## 👋 Getting Started

Follow these steps to run the project locally on your machine:

```bash
git clone https://github.com/tszhong0411/honghong.me.git
cd honghong.me
pnpm install
```

Create a `.env.local` file based on the provided `.env.example` file and fill in the necessary variables.

OR you can skip this by modifying `apps/web/src/env.ts`:

```ts
export const env = createEnv({
  skipValidation: true,

  server: {
    // ...
  }
})
```

It will skip the validation of environment variables. And you may notice that some functionalities will not work properly. But it's okay for learning.

Then build the necessary packages:

```bash
pnpm build:packages
```

To run the app in development mode:

```bash
pnpm dev
```

The app will be available at `localhost:3000`.

The `react email` will be available at `localhost:3001`.

## ✈️ TODO

- Use strict content security policy - still not working in `14.0.4`
  - `next/image` - https://github.com/vercel/next.js/issues/45184
  - `nonces` - https://github.com/vercel/next.js/discussions/54907
  - `main-app.js` - https://github.com/vercel/next.js/issues/55129

## ❤️ Credits

This project has been possible thanks to the wonderful open-source community. Special thanks to [Timothy](https://www.timlrx.com/) for the [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog).

## ✍🏻 Author

- [@tszhong0411](https://github.com/tszhong0411)

## ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://honghong.me/"><img src="https://avatars.githubusercontent.com/u/75498339?v=4?s=50" width="50px;" alt="Hong"/><br /><sub><b>Hong</b></sub></a><br /><a href="https://github.com/tszhong0411/honghong.me/commits?author=tszhong0411" title="Code">💻</a> <a href="https://github.com/tszhong0411/honghong.me/commits?author=tszhong0411" title="Documentation">📖</a> <a href="#design-tszhong0411" title="Design">🎨</a> <a href="#ideas-tszhong0411" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-tszhong0411" title="Maintenance">🚧</a> <a href="https://github.com/tszhong0411/honghong.me/commits?author=tszhong0411" title="Tests">⚠️</a> <a href="https://github.com/tszhong0411/honghong.me/issues?q=author%3Atszhong0411" title="Bug reports">🐛</a> <a href="#question-tszhong0411" title="Answering Questions">💬</a> <a href="https://github.com/tszhong0411/honghong.me/pulls?q=is%3Apr+reviewed-by%3Atszhong0411" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## 🪪 License

This project is open source and available under the [GPL3 License](LICENSE).

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>

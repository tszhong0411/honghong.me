<p align="center">
  <img src="https://honghong.me/images/projects/blog/cover.png">
</p>

[![GitHub](https://img.shields.io/github/license/tszhong0411/honghong.me)](https://github.com/tszhong0411/honghong.me/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/tszhong0411/honghong.me/branch/main/graph/badge.svg)](https://codecov.io/gh/tszhong0411/honghong.me)
[![CodeFactor](https://www.codefactor.io/repository/github/tszhong0411/honghong.me/badge)](https://www.codefactor.io/repository/github/tszhong0411/honghong.me)
[![CI](https://github.com/tszhong0411/honghong.me/actions/workflows/ci.yml/badge.svg)](https://github.com/tszhong0411/honghong.me/actions/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tszhong0411/honghong.me/blob/main/CONTRIBUTING.md)
![GitHub top language](https://img.shields.io/github/languages/top/tszhong0411/honghong.me)
![GitHub repo size](https://img.shields.io/github/repo-size/tszhong0411/honghong.me)

Welcome to the monorepo of my personal blog! This repository houses the code for my blog, where I share my thoughts, projects, and insights. Feel free to explore and get inspired.

## ✨ Features

- ⚡️ Next.js 14 with App Router (Turbo)
- 📝 MDX
- 🎨 Tailwind CSS - for styling
- 🌈 Radix UI - accessible UI components
- 🛡 Strict TypeScript and ESLint configuration
- 📱 Responsive design
- 🌗 Dark mode
- 📈 SEO optimized with meta tags and JSON-LD
- 📰 RSS feed
- 🗺 Sitemap
- 📊 Umami Analytics
- 📝 Blog with comments, likes, and post views
- 🔎 Blog post search
- 📖 Table of contents for blog posts
- 📷 Image zoom - zoom in on images in blog posts
- 📝 Code syntax highlighting - for code blocks in blog posts
- 🎨 Animation - using Framer Motion
- 🤖 GitHub Actions for CI/CD
- 🏠 LightHouse score of nearly 100
- 🧪 Vitest - unit and integration tests
- 🎭 Playwright - end-to-end tests
- ☂️ Codecov - code coverage
- 🔨 Husky & Lint Staged - lint and format code before committing
- ✅ Conventional commit lint - make sure commit messages follow the conventional commit format
- 🔒 NextAuth.js - authentication
- 💄 Prettier - code formatting
- ◮ Prisma - ORM
- 👷🏻‍♂️ t3-env - validate environment variables before building

## 🔨 Requirements

- Node with [Corepack](https://github.com/nodejs/corepack), recommended `18.x`, minimum `16.9.0`
- pnpm, recommended `8.14.0`, minimum `8.x`
- MySQL, recommended `8.0`, minimum `5.6`
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

```bash
pnpm dev
```

The app will become available at `http://localhost:3000`.

## ✈️ TODO

- Use strict content security policy - still not working in `14.0.4`
  - `next/image` - https://github.com/vercel/next.js/issues/45184
  - `nonces` - https://github.com/vercel/next.js/discussions/54907
  - `main-app.js` - https://github.com/vercel/next.js/issues/55129

## ❤️ Credits

This project has been possible thanks to the wonderful open-source community. Special thanks to [Timothy](https://www.timlrx.com/) for the [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog).

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

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>

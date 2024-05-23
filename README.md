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

- ⚡️ Next.js 14 with App Router
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
- 🏠 LightHouse score of nearly 100
- 🔨 Husky & Lint Staged - lint and format code before committing
- ✅ Conventional commit lint - make sure commit messages follow the conventional commit format
- 🔒 NextAuth.js - authentication
- 💄 Prettier - code formatting
- 〰️ Drizzle - ORM
- 👷🏻‍♂️ t3-env - validate environment variables before building
- 🤖 Auto refresh - fast refresh when updating MDX

## 🔨 Requirements

- Node, recommended `20.x` with [corepack](https://nodejs.org/api/corepack.html) enabled
- pnpm, recommended `9.x`
- PostgreSQL, recommended `14.x` (using [docker compose](./docker-compose.yml))
- [Visual Studio Code](https://code.visualstudio.com/) with [recommended extensions](.vscode/extensions.json)
- Optionally [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## 👋 Getting Started

Please refer to the [contributing guidelines](./CONTRIBUTING.md) for detailed information on how to start the app locally and contribute to this project.

## ✈️ TODO

- Use strict content security policy - still not working in `14.0.4`
  - `next/image` - https://github.com/vercel/next.js/issues/45184
  - `nonces` - https://github.com/vercel/next.js/discussions/54907
  - `main-app.js` - https://github.com/vercel/next.js/issues/55129

## ❤️ Credits

This project has been possible thanks to the wonderful open-source community. Special thanks to [Timothy](https://www.timlrx.com/) for the [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog).

This project also uses / adapts the following open-source projects
Without them, this project would not have been possible:

- Comment System - from [fuma-comment](https://github.com/fuma-nama/fuma-comment)
- Rehype Plugins - from [fuma-docs](https://github.com/fuma-nama/fumadocs)
- MDX Rendering - from [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- Auto Refresh - from [next-remote-refresh](https://github.com/souporserious/next-remote-refresh)
- UI - from [shadcn/ui](https://github.com/shadcn-ui/ui)

Referenced the following projects for inspiration:

- [fumadocs](https://fumadocs.vercel.app/) ❤️
- [leerob.io](https://leerob.io/)
- [nextra](https://nextra.site/)
- [theodorusclarence.com](https://theodorusclarence.com/)
- [ped.ro](https://ped.ro/)
- [delba.dev](https://delba.dev/)
- [joshwcomeau.com](https://www.joshwcomeau.com/)
- [blog.maximeheckel.com](https://blog.maximeheckel.com/)
- [zenorocha.com](https://zenorocha.com/)
- [jahir.dev](https://jahir.dev/)
- [anishde.dev](https://anishde.dev/)
- [nikolovlazar.com](https://nikolovlazar.com/)
- [samuelkraft.com](https://samuelkraft.com/)
- [bentogrids](https://bentogrids.com/)
- [ui.aceternity.com](https://ui.aceternity.com/)
- [hover.dev](https://www.hover.dev/)
- [vocs.dev](https://vocs.dev/)

and more but I can't remember them all 🥹

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

Please do not deploy this directly to production. It is not a template and is not intended to be used as one.

This project is open source and available under the [GPL3 License](LICENSE).

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>

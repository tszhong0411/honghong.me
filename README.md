<p align="center">
  <img alt="" src="https://honghong.me/images/projects/blog/cover.png">
</p>

<h1 align="center">
  honghong.me
</h1>

<p align="center">
  <img alt="" src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&labelColor=000">
  <img alt="" src="https://img.shields.io/github/languages/top/tszhong0411/honghong.me?style=for-the-badge&labelColor=000">
  <img alt="" src="https://img.shields.io/github/license/tszhong0411/honghong.me?style=for-the-badge&labelColor=000">
</p>

Welcome to the monorepo of my personal blog! This repository houses the code for my blog, where I share my thoughts, projects, and insights. Feel free to explore and get inspired.

## Features

### Core Technologies

- Next.js 15 with App Router
- TypeScript with strict configuration
- Tailwind CSS for styling
- MDX for content
- Drizzle ORM
- I18n for internationalization support

### UI/UX

- Radix UI for accessible UI components
- Responsive design
- Light/Dark mode
- Image zoom in blog posts
- Shiki for code syntax highlighting
- Motion for animations
- Table of contents for blog posts

### Blog Features

- Comments system
- Like functionality
- Post view counter
- Blog post search
- RSS feed
- Sitemap

### Performance & SEO

- Lighthouse score of nearly 100
- SEO optimized with meta tags and JSON-LD
- Open graph images using `next/og`
- Fast refresh when updating MDX

### Development Experience

- Vitest for unit/integration testing
- Playwright for E2E testing
- ESLint configuration
- Prettier code formatting
- Husky & lint-staged
- Conventional commit lint
- CSpell for spell checking
- Auto refresh for MDX

### Authentication & Data

- NextAuth.js authentication
- Redis caching
- Upstash for API rate limiting
- t3-env for environment variables
- Umami Analytics

## Requirements

- Node, recommended `>=20.11.0` with [corepack](https://nodejs.org/api/corepack.html) enabled
- pnpm, recommended `>=9.x`
- [Visual Studio Code](https://code.visualstudio.com/) with [recommended extensions](.vscode/extensions.json)
- Optionally [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## Getting Started

Please refer to the [contributing guidelines](./CONTRIBUTING.md) for detailed information on how to start the app locally and contribute to this project.

## Credits

This project has been possible thanks to the wonderful open-source community. Special thanks to [Timothy](https://www.timlrx.com/) for the [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog).

This project also uses / adapts the following open-source projects.

Without them, this project would not have been possible:

- Comment System - from [fuma-comment](https://github.com/fuma-nama/fuma-comment)
- Rehype Plugins - from [fuma-docs](https://github.com/fuma-nama/fumadocs)
- MDX Rendering - from [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- MDX Handling - from [contentlayer](https://github.com/contentlayerdev/contentlayer)
- UI - from [shadcn/ui](https://github.com/shadcn-ui/ui)
- ESLint config - from [@antfu/eslint-config](https://github.com/antfu/eslint-config)

Referenced the following projects for inspiration:

- [fumadocs](https://fumadocs.vercel.app/)
- [leerob.io](https://leerob.io/)
- [nerdfish.be](https://www.nerdfish.be/)
- [nextra.site](https://nextra.site/)
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
- [bentogrids.com](https://bentogrids.com/)
- [ui.aceternity.com](https://ui.aceternity.com/)
- [hover.dev](https://www.hover.dev/)
- [vocs.dev](https://vocs.dev/)

and more but I can't remember them all

## Author

- [@tszhong0411](https://github.com/tszhong0411)

## License

Please do not deploy this directly to production. It is not a template and is not intended to be used as one.

This project is open source and available under the [GPL3 License](LICENSE).

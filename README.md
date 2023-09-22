<p align="center">
  <img src="https://honghong.me/images/projects/blog/cover.png">
</p>

[![GitHub](https://img.shields.io/github/license/tszhong0411/honghong.me)](https://github.com/tszhong0411/honghong.me/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/tszhong0411/honghong.me/branch/main/graph/badge.svg)](https://codecov.io/gh/tszhong0411/honghong.me)
[![CI](https://github.com/tszhong0411/honghong.me/actions/workflows/ci.yml/badge.svg)](https://github.com/tszhong0411/honghong.me/actions/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tszhong0411/honghong.me/blob/main/CONTRIBUTING.md)
![GitHub top language](https://img.shields.io/github/languages/top/tszhong0411/honghong.me)
![GitHub repo size](https://img.shields.io/github/repo-size/tszhong0411/honghong.me)

# Hong's Personal Blog

Welcome to my personal blog repository! This repository houses the code for my blog, where I share my thoughts, projects, and insights. Feel free to explore and get inspired.

## ⚡️ Tech Stack

Here's a rundown of the technologies and tools I've used to build this blog:

| Name                     | Link                                                                      |
| ------------------------ | ------------------------------------------------------------------------- |
| Framework                | [Next.js](https://nextjs.org/)                                            |
| Database                 | [Planetscale](https://planetscale.com/)                                   |
| ORM                      | [Prisma](https://prisma.io/)                                              |
| Authentication           | [NextAuth.js](https://next-auth.js.org/)                                  |
| Deployment               | [Vercel](https://vercel.com)                                              |
| Comments                 | [Giscus](https://giscus.app/)                                             |
| Favicon                  | [realfavicongenerator](https://realfavicongenerator.net/)                 |
| Content                  | [MDX](https://mdxjs.com/) + [Contentlayer](https://www.contentlayer.dev/) |
| Analytics                | [Umami](https://github.com/umami-software/umami)                          |
| Styling                  | [Tailwindcss](https://tailwindcss.com)                                    |
| Code Syntax Highlighting | [Shiki](https://github.com/shikijs/shiki)                                 |

## 😍 Features

| Name                         | Description                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strict TypeScript and ESLint | Strict TypeScript and ESLint configuration to ensure code quality.                                                                                |
| JSDoc                        | JSDoc comments for all functions.                                                                                                                 |
| Prettier                     | Code formatting using [Prettier](https://prettier.io/).                                                                                           |
| Radix UI                     | Built with [Radix UI](https://www.radix-ui.com/) components.                                                                                      |
| NextAuth.js                  | Authentication using [NextAuth.js](https://next-auth.js.org/).                                                                                    |
| App Directory                | Using app router.                                                                                                                                 |
| Tailwindcss                  | Using [Tailwindcss](https://tailwindcss.com/) for styling.                                                                                        |
| Next.js                      | Built with [Next.js](https://nextjs.org/) `13.5.2`.                                                                                               |
| Prisma                       | Using [Prisma](https://prisma.io/) as the ORM.                                                                                                    |
| SEO                          | SEO optimized with meta tags and JSON-LD.                                                                                                         |
| RSS Feed                     | Subscribe to the RSS feed to get notified of new posts.                                                                                           |
| Sitemap                      | Sitemap for search engines.                                                                                                                       |
| Analytics                    | Track page views and visitor information.                                                                                                         |
| Accessibility                | Accessible to all users.                                                                                                                          |
| Testing                      | Unit tests using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/) and [MSW](https://github.com/mswjs/msw). |
| CI/CD                        | Continuous integration and deployment using GitHub Actions.                                                                                       |
| MDX                          | Write posts using [MDX](https://mdxjs.com/).                                                                                                      |
| Like Button                  | Like posts using the like button.                                                                                                                 |
| Post views                   | Track post views.                                                                                                                                 |
| Table of Contents            | Generate table of contents for posts.                                                                                                             |
| Comments                     | Comment on posts using [Giscus](https://giscus.app/).                                                                                             |
| Search                       | Search for posts using the search bar.                                                                                                            |
| Code Syntax Highlighting     | Highlight code blocks in posts.                                                                                                                   |
| Environment Variables        | Validate environment variables with [t3-env](https://github.com/t3-oss/t3-env)                                                                    |
| Animation                    | Animations using [Framer Motion](https://www.framer.com/motion/).                                                                                 |
| Image zoom                   | Zoom in on images using [React Medium Image Zoom](https://github.com/rpearce/react-medium-image-zoom)                                             |

## 👋 Getting Started

Follow these steps to run the project locally on your machine:

1. Clone the repository

```bash
git clone https://github.com/tszhong0411/honghong.me.git
```

2. Navigate to the project directory

```bash
cd honghong.me
```

3. Install dependencies

```bash
yarn install
```

4. Configure environment variables

Create a `.env.local` file based on the provided `.env.example` file and fill in the necessary variables.

5. Run the development server

```bash
yarn dev
```

## ✈️ TODO

- Use strict content security policy - still not working in 13.5.1
  - `next/image` - https://github.com/vercel/next.js/issues/45184
  - `nonces` - https://github.com/vercel/next.js/discussions/54907
  - `main-app.js` - https://github.com/vercel/next.js/issues/55129

## 🔔 Important Note

Hello there! While I'm glad to see you're interested in my open-source project, I kindly request that you refrain from using this source code as a template for your website. Instead, I encourage you to use it as a learning resource and an inspiration to create something unique.

- **Originality**: Building something from scratch allows you to showcase your originality and creativity.
- **Learning**: Creating your own project helps you learn and improve your skills.

If you have questions or feedback, please reach out to me. Thank you for understanding!

## ❤️ Credits

This project has been possible thanks to the wonderful open-source community. Special thanks to [Timothy](https://www.timlrx.com/) for the [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog).

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>

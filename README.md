<h1 align="center">
 小康 blog
</h1>

<p align="center">
  <img src="https://socialify.git.ci/tszhong0411/honghong.me/image?forks=1&issues=1&logo=https://honghong.me/static/images/projects/blog/logo.png&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark">
</p>

<p align="center">
    <a href="https://honghong.me" target="blank">View Online</a>
    ·
    <a href="https://github.com/tszhong0411/honghong.me/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/tszhong0411/honghong.me/issues/new/choose">Request New Feature</a>
</p>

## 🌍 honghong.me

- Framework: [Next.js](https://nextjs.org/)
- Database: [Planetscale](https://planetscale.com/)
- ORM: [Prisma](https://prisma.io/)
- Authentication: [NextAuth.js](https://next-auth.js.org/)
- Deployment: [Vercel](https://vercel.com)
- Comments: [Giscus](https://giscus.app/)
- Favicon: [realfavicongenerator](https://realfavicongenerator.net/)
- Content: [MDX](https://mdxjs.com/) + [Contentlayer](https://www.contentlayer.dev/)
- Analytics: [Vercel](https://vercel.com/)
- Styling: [Tailwindcss](https://tailwindcss.com)
- Code Syntax Highlighting: [Shiki](https://github.com/shikijs/shiki)

## 👋 Running Locally

1. Clone the repository

```sh
git clone https://github.com/tszhong0411/honghong.me.git
```

2. Go to the project directory

```sh
cd honghong.me
```

3. Install dependencies

```sh
yarn
```

4. Create a `.env.local` file and input environment variables based on the `.env.example` file so that the project can run properly.

```txt
# Comment System (Giscus)
# https://giscus.app/
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=

# Spotify Now Playing
# https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Google API (YouTube stats)
# https://developers.google.com/youtube/v3/getting-started
GOOGLE_PRIVATE_KEY=
GOOGLE_CLIENT_EMAIL=

# Authentication
# https://next-auth.js.org/getting-started/example
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Github OAuth
# https://github.com/settings/applications/new
OAUTH_CLIENT_KEY=
OAUTH_CLIENT_SECRET=

# Github API (Github stats)
# https://github.com/settings/tokens/new
GITHUB_TOKEN=

# Database URL
DATABASE_URL=<DATABASE>://<HOST>:<PORT>/<DB>

# Just some random string (used for hashing)
# You can use https://www.useapassphrase.com/ to generate the string
IP_ADDRESS_SALT=

# WakaTime API Key (Coding hours)
# https://wakatime.com/api-key/
WAKATIME_API_KEY=
```

## 🍰 Contributing

Contributions make the open source community an excellent place to learn, inspire and create. Thank you very much for any contributions you make.

If you have better suggestions, fork and create a pull request. You can also simply open an issue with the "enhancement" tag. Don't forget to give this project a star! Thanks again!

1. Fork the repository
2. Commit your changes (`git commit -m 'Add some Feature'`)
3. Push to the branch (`git push`)
4. Open a Pull Request

## ❤️ Credits

- [Tailwind nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog) © [Timothy](https://www.timlrx.com/)

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>

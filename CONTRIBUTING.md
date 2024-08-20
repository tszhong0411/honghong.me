# Contributing to honghong.me

Welcome to the honghong.me repository! We're glad you're interested in contributing to our Next.js blog project. By contributing, you help make our project better and more useful for everyone. Below are some guidelines to get you started.

## Table of Contents

- [Issues](#issues)
- [Pull Requests](#pull-requests)
- [Setup](#setup)
- [Flags](#flags)
- [Conventional Commits](#conventional-commits)
- [Code Formatting](#code-formatting)

## Issues

If you encounter any issues, have suggestions, or want to report a bug, feel free to [create an issue](https://github.com/tszhong0411/honghong.me/issues). When creating an issue, please include a clear and descriptive title, along with relevant details about the problem or suggestion. This will help us understand and address the issue more effectively.

## Pull Requests

We welcome contributions through pull requests! If you're working on a bug fix, new feature, or improvements, follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name:
   - For bug fixes: `fix/issue-number-fix-description`
   - For features: `feature/description-of-feature`
3. Make your changes and commit following the [Conventional Commits](#conventional-commits) guidelines.
4. Push your changes to your forked repository.
5. Open a pull request from your branch to the `main` branch of the original repository.
6. Make sure you run `pnpm check` before submitting your pull request to ensure there are no issues.

## Setup

To set up the project locally, follow these steps:

1. Fork the repository.

2. Clone the repository:

```bash
git clone <your-forked-repo-url>
cd honghong.me
```

3. Copy the `.env.example` file to `.env.local`:

   Most features are turned off by default, so you don't need to set up all the environment variables to run the app. However, if you want to use a specific feature, you can set the necessary environment variables in the `.env.local` file and set the [flags](#flags) to true.

```bash
cp .env.example .env.local
```

4. Install the dependencies:

```bash
pnpm install
```

5. Run libSQL using Docker (or your preferred method):

```bash
docker compose up
```

6. Run the database migrations:

```bash
pnpm db:migrate
```

7. Run the app in development mode:

```bash
pnpm dev
```

The services will be available at the following URLs:

| Service                 | URL              |
| ----------------------- | ---------------- |
| App                     | `localhost:3000` |
| React Email             | `localhost:3001` |
| Docs                    | `localhost:3002` |
| ESLint Config Inspector | `localhost:7777` |
| Database                | `localhost:8080` |
| Redis                   | `localhost:6379` |
| Redis serverless        | `localhost:8079` |

## Flags

The following flags can be set in the `.env.local` file to enable specific features:

- `NEXT_PUBLIC_FLAG_COMMENT`: Comments on blog posts.
- `NEXT_PUBLIC_FLAG_AUTH`: Authentication.
- `NEXT_PUBLIC_FLAG_STATS`: Dashboard page.
- `NEXT_PUBLIC_FLAG_SPOTIFY`: Spotify integration (Now Playing).
- `NEXT_PUBLIC_FLAG_ANALYTICS`: Umami analytics.
- `NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION`: Discord notification for guestbook.
- `NEXT_PUBLIC_FLAG_LIKE_BUTTON`: Like button for blog posts.

## Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This helps us maintain a clear and organized commit history. Your commit messages should be formatted as follows:

```
<type>(<scope>): <description>
```

For example:

- `feat(homepage): add new hero section`
- `fix(styles): correct header alignment`

## Code Formatting

Before submitting a pull request, make sure your code is properly formatted. You can use the following commands to format your code:

- Run lint fixes:

```bash
pnpm lint:fix
```

- Check everything:

```bash
pnpm check
```

Make sure your changes are well-tested and your code follows best practices. Thank you for contributing to honghong.me! 🚀

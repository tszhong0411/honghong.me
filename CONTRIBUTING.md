# Contributing to honghong.me

Welcome to the honghong.me repository! We're glad you're interested in contributing to our Next.js blog project. By contributing, you help make our project better and more useful for everyone. Below are some guidelines to get you started.

## Table of Contents

- [Issues](#issues)
- [Pull Requests](#pull-requests)
- [Setup](#setup)
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

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/tszhong0411/honghong.me.git
   cd honghong.me
   ```

2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

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

- Format code:
  ```bash
  pnpm format
  ```

Make sure your changes are well-tested and your code follows best practices. Thank you for contributing to honghong.me! 🚀

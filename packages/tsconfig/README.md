# @tszhong0411/tsconfig

The TypeScript configuration for tszhong0411 projects.

## Installation

Install the package:

```bash
npm install -D @tszhong0411/tsconfig
# or
yarn add -D @tszhong0411/tsconfig
# or
pnpm add -D @tszhong0411/tsconfig
# or
bun add -D @tszhong0411/tsconfig
```

## Usage

The `@tszhong0411/tsconfig` package provides two distinct configuration files: `base.json` for basic TypeScript projects and `nextjs.json` for Next.js projects.

### Basic TypeScript Project Configuration (`base.json`)

To configure a basic TypeScript project, create a `tsconfig.json` file in the root directory of your project and extend `base.json`:

```json
{
  "extends": "@tszhong0411/tsconfig/base.json"
}
```

This configuration is optimized for standard TypeScript projects, covering essential compiler options and settings.

### Next.js Project Configuration (`nextjs.json`)

For Next.js projects, use the `nextjs.json` configuration. Create a `tsconfig.json` file in your Next.js project's root directory and extend `nextjs.json`:

```json
{
  "extends": "@tszhong0411/tsconfig/nextjs.json"
}
```

The `nextjs.json` configuration extends the `base.json` configuration and adds settings specific to Next.js development, such as JSX preservation and necessary libraries.

## License

This project is licensed under the [MIT License](LICENSE).

# @tszhong0411/prettier-config

The Prettier configuration for tszhong0411 projects.

## Installation

Install the package:

```bash
npm install -D @tszhong0411/prettier-config
# or
yarn add -D @tszhong0411/prettier-config
# or
pnpm add -D @tszhong0411/prettier-config
# or
bun add -D @tszhong0411/prettier-config
```

## Usage

To use this prettier config, just reference it in your `package.json` file:

```json
{
  "name": "my-project",
  "prettier": "@tszhong0411/prettier-config",
  "version": "1.0.0"
}
```

You can also reference it in your `.prettierrc.js` file:

```js
module.exports = '@tszhong0411/prettier-config'
```

You can modify these settings by creating your own `prettier.config.js` file and extending this config:

```js
module.exports = {
  ...require('@tszhong0411/prettier-config'),
  semi: true
}
```

## License

This project is licensed under the [MIT License](LICENSE).

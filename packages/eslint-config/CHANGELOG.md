# @tszhong0411/eslint-config

## 0.1.36

### Patch Changes

- b152423: Upgrade dependencies

## 0.1.35

### Patch Changes

- 10ccc18: Upgrade next from ^15.2.0 to ^15.2.3

## 0.1.34

### Patch Changes

- 9b6ae55: Update dependencies

  - Upgrade @eslint-react/eslint-plugin from `^1.22.1` to `^1.28.0`
  - Upgrade @eslint/js from `^9.17.0` to `^9.21.0`
  - Upgrade @next/eslint-plugin-next from `^15.1.5` to `^15.2.0`
  - Upgrade @typescript-eslint/eslint-plugin from `^8.19.0` to `^8.25.0`
  - Upgrade @typescript-eslint/parser from `^8.18.2` to `^8.25.0`
  - Upgrade eslint-config-flat-gitignore from `^1.0.0` to `^2.1.0`
  - Upgrade eslint-config-prettier from `^9.1.0` to `^10.0.2`
  - Upgrade eslint-plugin-playwright from `^2.1.0` to `^2.2.0`
  - Upgrade eslint-plugin-prettier from `^5.2.1` to `^5.2.3`
  - Upgrade eslint-plugin-sonarjs from `^3.0.1` to `^3.0.2`
  - Upgrade eslint-plugin-tailwindcss from `^3.17.5` to `^3.18.0`
  - Upgrade eslint-plugin-turbo from `^2.3.3` to `^2.4.4`
  - Upgrade eslint-plugin-unicorn from `^56.0.1` to `^57.0.0`
  - Upgrade globals from `^15.14.0` to `^16.0.0`
  - Upgrade local-pkg from `^1.0.0` to `^1.1.0`
  - Upgrade @eslint/config-inspector from `^1.0.0` to `^1.0.1`
  - Upgrade eslint from `^9.17.0` to `^9.21.0`
  - Change peerDependencies eslint from `^9.10.0` to `^9.20.0`

## 0.1.33

### Patch Changes

- 0e4db9d: Update options of rule `no-confusing-void-expression`

## 0.1.32

### Patch Changes

- f26d25a: Remove `turbo` auto-detection as it has a false positive

## 0.1.31

### Patch Changes

- d7cc990: Turn off `unicorn/prefer-spread` due to a conflict

## 0.1.30

### Patch Changes

- f57ea28: Set `endOfLine` to auto in prettier rules

## 0.1.29

### Patch Changes

- cc0a23e: Enable auto-detection for typescript and turbo

## 0.1.28

### Patch Changes

- 53f3741: Remove auto-detection support

## 0.1.27

### Patch Changes

- fbd59cb: Temporarily disable tailwindcss plugin

## 0.1.26

### Patch Changes

- [`3533dc2`](https://github.com/tszhong0411/honghong.me/commit/3533dc245971e6966fabd4af44f98d0b07da2544): Disable sonarjs/pseudo-random rule in ESLint config

- [`995c4ed`](https://github.com/tszhong0411/honghong.me/commit/995c4ed804cf08f961a6486fa9a3676360f7a1fe): Disable no-complex-conditional-rendering rule in ESLint config for React

## 0.1.25

### Patch Changes

- [`35961d4`](https://github.com/tszhong0411/honghong.me/commit/35961d402c0cc75f681b4d957f05b28ade02de62): It's deprecated. Use `no-complex-conditional-rendering` instead.

## 0.1.24

### Patch Changes

- [`ef4e2ad`](https://github.com/tszhong0411/honghong.me/commit/ef4e2ad7db590a228f9a05c536cf5f206a59e76e): Disable `unicorn/prefer-string-raw` rule

- [`dfc7149`](https://github.com/tszhong0411/honghong.me/commit/dfc71494d2c6d8853b4c6c66f4d7897bc7981aff): Enhance import sorting rules for better organization

## 0.1.23

### Patch Changes

- [`8987924`](https://github.com/tszhong0411/honghong.me/commit/8987924d3ef98b1eb092bc3fad8bdbbe09b894f1): Modify accessibility rules for non-interactive elements

- [#990](https://github.com/tszhong0411/honghong.me/pull/990) [`68e6a9f`](https://github.com/tszhong0411/honghong.me/commit/68e6a9f1c116f7962e14778b95d0bae34008f508): Bump local-pkg from 0.5.1 to 1.0.0

- [#992](https://github.com/tszhong0411/honghong.me/pull/992) [`ea2de1e`](https://github.com/tszhong0411/honghong.me/commit/ea2de1ef9cf9fce968a6a2d1ee10c5d30c6d406e): Bump @next/eslint-plugin-next from 15.1.3 to 15.1.5

## 0.1.22

### Patch Changes

- [`5e4e995`](https://github.com/tszhong0411/honghong.me/commit/5e4e99503511f92418085c2b1df8dbe4f4e019e6): Disable no-array-index-key rule in react

## 0.1.21

### Patch Changes

- [`7098116`](https://github.com/tszhong0411/honghong.me/commit/70981167e4db89df97eba5f213aa44460e9cb04a): Add clsx and tv as tailwind callees

## 0.1.20

### Patch Changes

- [#955](https://github.com/tszhong0411/honghong.me/pull/955) [`6394741`](https://github.com/tszhong0411/honghong.me/commit/6394741ab8b550ac903adad165545d9babdd9557): Bump eslint-config-flat-gitignore from 0.3.0 to 1.0.0

## 0.1.19

### Patch Changes

- [#942](https://github.com/tszhong0411/honghong.me/pull/942) [`bf027a4`](https://github.com/tszhong0411/honghong.me/commit/bf027a4130c3c1c47f9381b1160bc7496a12cfb0): Turn off `jsx-a11y/no-aria-hidden-on-focusable`

- [`fdba13e`](https://github.com/tszhong0411/honghong.me/commit/fdba13e933085bec17f85ec686161377295e13f7): Update license

## 0.1.18

### Patch Changes

- [`27a8f95`](https://github.com/tszhong0411/honghong.me/commit/27a8f95acb39c86851102d00bc984a0100e81cbb): Turn off @eslint-react/hooks-extra/no-direct-set-state-in-use-effect

## 0.1.17

### Patch Changes

- [`3b84261`](https://github.com/tszhong0411/honghong.me/commit/3b84261a1d8c5ffa391b7bffd4aa1aaad8e86f48): Update next to 15.1.3

## 0.1.16

### Patch Changes

- [`4ba7cab`](https://github.com/tszhong0411/honghong.me/commit/4ba7cabbfc41bfd60b32d5328217d78d452d4e96): Chore bump @typescript-eslint/eslint-plugin from 8.18.2 to 8.19.0

## 0.1.15

### Patch Changes

- [`421bb8a`](https://github.com/tszhong0411/honghong.me/commit/421bb8a05db2b3fbd0722bdf774b66f70d61bbb7): Export `Configs` to fix TS2742 error

## 0.1.14

### Patch Changes

- [`a80ec11`](https://github.com/tszhong0411/honghong.me/commit/a80ec115d979814c560d6b380aafca2ba2aed396): Set eslint to `^9.10.0` in peerDependencies
  - Upgrade `@eslint/config-inspector` to `0.6.0`

## 0.1.13

### Patch Changes

- [#878](https://github.com/tszhong0411/honghong.me/pull/878) [`a36fd40`](https://github.com/tszhong0411/honghong.me/commit/a36fd4020c8f1853648997fd7c3313bdc16691a5): Upgrade to ESLint v9

## 0.1.12

### Patch Changes

- [`18c9e66`](https://github.com/tszhong0411/honghong.me/commit/18c9e66e50bb5d27eb9105a22a1d8aa55b55aba4): Turn off a rule

## 0.1.11

### Patch Changes

- [`ed6bbcc`](https://github.com/tszhong0411/honghong.me/commit/ed6bbcc865a28fa36660439d7948f61261f76586): Enabled most of the rules in `@eslint-react/` packages.
  Enabled two more rules of `jsx-a11y` package

  ```json
  {
    "jsx-a11y/no-aria-hidden-on-focusable": "error",
    "jsx-a11y/prefer-tag-over-role": "error"
  }
  ```

## 0.1.10

### Patch Changes

- [`0c5c095`](https://github.com/tszhong0411/honghong.me/commit/0c5c0958541564c7748286b9ec77ad3d8d6e9041): Add @eslint-react/web-api

## 0.1.9

### Patch Changes

- [#846](https://github.com/tszhong0411/honghong.me/pull/846) [`720fe93`](https://github.com/tszhong0411/honghong.me/commit/720fe936e3754e927943fcc513701e5be8cc4bed): Tree-shakable

## 0.1.8

### Patch Changes

- [`a3a78a4`](https://github.com/tszhong0411/honghong.me/commit/a3a78a47d684fd18590f9d20176e0036228dc105): Export all globs

## 0.1.7

### Patch Changes

- [`3c32410`](https://github.com/tszhong0411/honghong.me/commit/3c32410dc95c23aa4df7de65bba7aa1acfc55f3d): Update ts, react rules

- [`540ef39`](https://github.com/tszhong0411/honghong.me/commit/540ef39cada64ad1deaea676bc919d4953c80976): Update rules for react and next

## 0.1.6

### Patch Changes

- [`99347b9`](https://github.com/tszhong0411/honghong.me/commit/99347b93a647b9d1a8aa2347893038987619e5ea): Add a script to sync repo

## 0.1.5

### Patch Changes

- [`3c31c4b`](https://github.com/tszhong0411/honghong.me/commit/3c31c4ba1a8d124af9cf82a558519036466d58e0): Update eslint rules

## 0.1.4

### Patch Changes

- [`9bc2bac`](https://github.com/tszhong0411/honghong.me/commit/9bc2bac575d6345b67b0a06205d0553d08a8e47a): Update rules

## 0.1.3

### Patch Changes

- [`89effca`](https://github.com/tszhong0411/honghong.me/commit/89effcaf692c309c813210e5df19a66cb35c3e68): Update config

## 0.1.2

### Patch Changes

- [#779](https://github.com/tszhong0411/honghong.me/pull/779) [`0e58532`](https://github.com/tszhong0411/honghong.me/commit/0e58532edf14b65cc5d718200139da0d912884d4): Bump packages

## 0.1.1

### Patch Changes

- [`e56a965`](https://github.com/tszhong0411/honghong.me/commit/e56a96595ccc1d702377c74d3329d77f247c22ca): Sort json

## 0.1.0

### Patch Changes

- [`e632ac3`](https://github.com/tszhong0411/honghong.me/commit/e632ac37ce024c3466fa7d5085031bffb05f46c4): Use flat config

- [`9ec0941`](https://github.com/tszhong0411/honghong.me/commit/9ec0941334638c7a6d2d57c1977665c8f6b4b239): Lint json with eslint

## 0.0.9

### Patch Changes

- [#773](https://github.com/tszhong0411/honghong.me/pull/773) [`e8a3e45`](https://github.com/tszhong0411/honghong.me/commit/e8a3e45913920aaa34c96914ef1cea49358ac509): Update config

## 0.0.8

### Patch Changes

- [`5146ee9`](https://github.com/tszhong0411/honghong.me/commit/5146ee9777cdddcd80aae80a7025c256811f8174): Disable no duplicate string

## 0.0.7

### Patch Changes

- [`75eefee`](https://github.com/tszhong0411/honghong.me/commit/75eefee1d6fee2bf325e02372e39b8831f3e6f8a): Add lint-staged

- [`630de30`](https://github.com/tszhong0411/honghong.me/commit/630de3082a4006918a1f2d90a33a625b4cd1db4c): Update deps

- [`f2572a7`](https://github.com/tszhong0411/honghong.me/commit/f2572a78c350b1841b4a121b3b1ef2b04ea91a8b): Add eslint plugin import

- [`337aa0e`](https://github.com/tszhong0411/honghong.me/commit/337aa0e5cd9b0ce8fd210a0bf1841a798f654c9a): Update rules

- [`9fb3f40`](https://github.com/tszhong0411/honghong.me/commit/9fb3f40532ca325525fd8869cf22f6ff920a6884): Update eslint plugin import settings

## 0.0.6

### Patch Changes

- [#758](https://github.com/tszhong0411/honghong.me/pull/758) [`d900d5c`](https://github.com/tszhong0411/honghong.me/commit/d900d5c56f2ef3ff0ab8cb70deed5f4205c4db3d): Update deps and readme

- [#758](https://github.com/tszhong0411/honghong.me/pull/758) [`6b81b01`](https://github.com/tszhong0411/honghong.me/commit/6b81b010b707821e94576f11da29e50c5ae6b0f6): Update ignorePatterns

- [#758](https://github.com/tszhong0411/honghong.me/pull/758) [`fb58079`](https://github.com/tszhong0411/honghong.me/commit/fb5807996730d4c542e854a834272fb629de4ce7): Turn off a react rule

## 0.0.5

### Patch Changes

- [`6728590`](https://github.com/tszhong0411/honghong.me/commit/67285903508a48739f023dae9f4630a42699972c): Update deps

## 0.0.4

### Patch Changes

- [`98b464b`](https://github.com/tszhong0411/honghong.me/commit/98b464bea5534104c3c29e9f95ae670d22f34c57): Only apply typescript eslint for ts files

## 0.0.3

### Patch Changes

- [`2116078`](https://github.com/tszhong0411/honghong.me/commit/2116078f9c650e98e965b0347678c38e2eb4c8da): Remove turbo eslint

## 0.0.2

### Patch Changes

- [`a590bee`](https://github.com/tszhong0411/honghong.me/commit/a590bee03f3b746c780ff7a775ca5734c177ec66): Add react-hooks

## 0.0.1

### Patch Changes

- [`61254f8`](https://github.com/tszhong0411/honghong.me/commit/61254f80abb63f43310cefd5ccc4dcd8eb098875): Initial publish

# [blog.ciffelia.com](https://blog.ciffelia.com)

[![CI Status](https://github.com/ciffelia/blog.ciffelia.com/workflows/CI/badge.svg?branch=main)](https://github.com/ciffelia/blog.ciffelia.com/actions?query=workflow%3ACI+branch%3Amain)

My personal blog built with Next.js

## Development

```shell
yarn run dev
```

## Updating `@typescript-eslint/*`

This package has `@typescript-eslint/eslint-plugin` as a direct dependency and `@typescript-eslint/parser` as an indirect dependency. According to [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript#typescript-eslint-dependencies), the installed versions of these packages should be the same.

To achieve this, we execute the following procedure to upgrade these packages.

```shell
# Upgrade direct dependencies (modifies package.json and yarn.lock)
yarn up '@typescript-eslint/*'
# Upgrade all dependencies (modifies yarn.lock only)
yarn up --recursive '@typescript-eslint/*'
```

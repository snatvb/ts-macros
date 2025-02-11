# unplugin-ts-macros

[![NPM version](https://img.shields.io/npm/v/unplugin-starter?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-ts-macros)

## Install

```bash
npm i unplugin-ts-macros
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import TsMacros from "unplugin-ts-macros/vite"

export default defineConfig({
  plugins: [
    TsMacros({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import TsMacros from "unplugin-ts-macros/rollup"

export default {
  plugins: [
    TsMacros({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-ts-macros/webpack")({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    [
      "unplugin-ts-macros/nuxt",
      {
        /* options */
      },
    ],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-ts-macros/webpack")({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from "esbuild"
import TsMacros from "unplugin-ts-macros/esbuild"

build({
  plugins: [TsMacros()],
})
```

<br></details>

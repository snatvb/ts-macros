import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit"
import vite from "./vite"
import webpack from "./webpack"
import type { Options } from "./types"
import "@nuxt/schema"

export interface ModuleOptions extends Options {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-unplugin-ts-macros",
    configKey: "unpluginStarter",
  },
  defaults: {
    // ...default options
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options))
    addWebpackPlugin(() => webpack(options))

    // ...
  },
})

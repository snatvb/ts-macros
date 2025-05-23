import type { UnpluginFactory } from "unplugin"
import { createUnplugin } from "unplugin"
import { Macro, MacroTransformer } from "../../src/transformer"
import type { Options } from "./types"
import ts from "typescript"
import { TsMacrosConfig } from "../../src"

const transformerConfig: TsMacrosConfig = {
  noComptime: false,
  keepImports: true,
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  userOptions = {},
) => {
  const options = {
    ...transformerConfig,
    ...userOptions,
  }
  const macros = new Map<ts.Symbol, Macro>()

  const config =
    options.tsconfig ||
    ts.findConfigFile(process.cwd(), ts.sys.fileExists, "tsconfig.json")
  if (!config) {
    throw new Error("Failure to read config")
  }
  const readConfig = ts.parseConfigFileWithSystem(
    config,
    {},
    undefined,
    undefined,
    ts.sys,
    () => undefined,
  )
  if (!readConfig) {
    throw new Error("Failure to parse config", { cause: config })
  }
  if (readConfig.errors.length) {
    throw readConfig.errors
  }

  const compilerHost = ts.createCompilerHost(readConfig.options)

  const printer = ts.createPrinter()
  const originalReadFile = compilerHost.readFile.bind(compilerHost)

  return {
    name: "unplugin-ts-macros",
    enforce: "pre",
    transformInclude(id) {
      return id.endsWith(".ts") || id.endsWith(".tsx")
    },
    load(id) {
      if (id.endsWith(".ts") || id.endsWith(".tsx")) {
        macros.clear()
      }
    },
    transform(code, id) {
      compilerHost.readFile = (fileName: string) => {
        if (fileName === id) {
          return code
        }
        return originalReadFile(fileName)
      }
      const program = ts.createProgram([id], readConfig.options, compilerHost)
      const file = program.getSourceFile(id)

      if (!file) {
        throw new Error(`Unable to read file ${id}`)
      }

      if (file.isDeclarationFile) {
        return code
      }

      const transformer = new MacroTransformer(
        ts.nullTransformationContext,
        program.getTypeChecker(),
        macros,
        transformerConfig,
      )

      const transformed = transformer.run(file)

      return printer.printFile(transformed)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

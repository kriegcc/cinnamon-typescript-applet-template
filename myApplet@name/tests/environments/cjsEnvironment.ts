import { TestEnvironment } from "jest-environment-node"
import type { EnvironmentContext, JestEnvironmentConfig } from "@jest/environment"

import { createCjsGlobals } from "./createCjsGlobals"

export default class CjsEnvironment extends TestEnvironment {
  private testPath: string
  private docblockPragmas: Record<string, string | string[]>

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    // console.log(config.globalConfig)
    // console.log(config.projectConfig)
    console.log("Hello from CjsEnvironment")
    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
  }

  async setup() {
    await super.setup()

    const cjsGlobals = createCjsGlobals()
    // console.log("--> cjsGlobals: ", cjsGlobals)

    Object.assign(this.global, cjsGlobals)

    // log to ensure globals are set correctly
    // console.log("--> Global imports:", this.global.imports)
  }

  async teardown() {
    await super.setup()
  }
}

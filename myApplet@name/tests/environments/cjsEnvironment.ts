// resources:
// https://www.kenmuse.com/blog/crash-course-jest-test-environments-with-typescript/
// Be careful with imports CJS vs ESM

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
    console.log("--> cjsGlobals: ", cjsGlobals)

    Object.assign(this.global, cjsGlobals)

    // // overriding the "this.global.global" object would lead to "describe" from jest not working anymore :-(
    // Object.assign(this.global.global, global)

    // this.global.console = null
  }

  async teardown() {
    await super.setup()
  }
}

import { TestEnvironment } from "jest-environment-node"
import type { EnvironmentContext, JestEnvironmentConfig } from "@jest/environment"

export default class CjsEnvironment extends TestEnvironment {
  private testPath: string
  private docblockPramas: Record<string, string | string[]>

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    // console.log(config.globalConfig)
    // console.log(config.projectConfig)
    console.log("Hello from CjsEnvironment")
    this.testPath = context.testPath
    this.docblockPramas = context.docblockPragmas
  }

  async setup() {
    await super.setup()

    // Your code here

    // ⋮
  }

  async teardown() {
    await super.setup()

    // Your code here

    // ⋮
  }

  // async getVmContext() {
  //   return super.setup()
  // }
}

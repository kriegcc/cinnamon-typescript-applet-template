import { createDefaultPreset, JestConfigWithTsJest } from "ts-jest"
const config: JestConfigWithTsJest = {
  ...createDefaultPreset(),
  verbose: true,
  testEnvironment: "./test/environments/cjsEnvironment.ts",
  moduleDirectories: ["node_modules", "src", "test"],
}

export default config

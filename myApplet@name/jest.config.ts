import { createDefaultPreset, JestConfigWithTsJest } from "ts-jest"
const config: JestConfigWithTsJest = {
  ...createDefaultPreset(),
  verbose: true,
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "<rootDir>", "src"],
}

export default config

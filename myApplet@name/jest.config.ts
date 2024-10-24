import { createDefaultPreset, JestConfigWithTsJest } from "ts-jest"
const config: JestConfigWithTsJest = {
  ...createDefaultPreset(),
  verbose: true,
  // automock: true,
  testEnvironment: "./tests/environments/cjsEnvironment.ts",
  moduleDirectories: ["node_modules", "src", "tests"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tests/tsconfig.json",
      },
    ],
  },
}

export default config

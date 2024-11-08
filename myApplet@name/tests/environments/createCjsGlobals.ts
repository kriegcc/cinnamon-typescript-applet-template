import * as St from "./cjs/gi/St"

export function createCjsGlobals() {
  // TODO: somehow re-create / mock CJS stuff for Jest environment. This seems quite difficult ..
  return {
    imports: {
      gi: {
        St,
      },
    },
    global: {
      stage: {},
      log: console.log,
      logError: (error: string) => console.log(error),
    },
  }
}

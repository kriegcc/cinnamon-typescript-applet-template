export function createCjsGlobals() {
  return {
    global: {
      log: console.log,
      logError: (error: string) => console.log(error),
    }
  }
}
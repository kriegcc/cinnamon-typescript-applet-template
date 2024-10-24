import { ExampleClass } from "misc"
// import { ExampleClass } from "../../src/misc"

describe("ExampleClass", () => {
  test("returns initial value", () => {
    const exampleClass = new ExampleClass(10)

    expect(exampleClass.getValue()).toBe(10)
  })
})

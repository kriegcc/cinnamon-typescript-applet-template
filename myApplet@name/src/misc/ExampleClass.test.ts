import { ExampleClass } from "misc"

describe("ExampleClass", () => {
  test("returns initial value", () => {
    const exampleClass = new ExampleClass(10)
  
    expect(exampleClass.getValue()).toBe(10)
  })
})

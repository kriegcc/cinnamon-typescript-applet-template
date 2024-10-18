import { describe, expect, test } from "@jest/globals"
import { ExampleClass } from "./ExampleClass"

describe("ExampleClass", () => {
  test("returns initial value", () => {
    const exampleClass = new ExampleClass(10)
  
    expect(exampleClass.getValue()).toBe(10)
  })
})

export class ExampleClass {
  private value: number

  constructor(value: number) {
    this.value = value
  }

  public setValue(newValue: number): void {
    this.value = newValue
  }

  public getValue(): number {
    return this.value
  }
}

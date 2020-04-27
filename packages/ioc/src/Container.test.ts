import { expect, suite } from './test_suite.ts'
import { Container } from './container.ts'

const it = suite("Flow1")

const container = new Container()

class Example { }

it("can register a class", () => {
    container.register(Example)

    class LocalClass { }
    container.register(LocalClass)
})
it("can inject a class", () => {
    expect(container.resolve(Example)).not.toBeNull()
    class LocalClass { }
    expect(container.resolve(LocalClass)).toBeNull()
})

it("can override a registration", () => {
    expect(container.resolve(Example)).not.toBeNull()
    container.override(Example, {
        useValue: 5
    })
    expect(container.resolve(Example)).toBe(5)
})
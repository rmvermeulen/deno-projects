import { expect } from "x/expect/mod.ts";
import { Container } from "./container.ts";

class Example {}

Deno.test("Container", () => {
  const container = new Container();
  container.register(Example);

  {
    class LocalClass {}
    container.register(LocalClass);
  }
  expect(container.resolve(Example)).not.toBeNull();
  {
    class LocalClass {}
    expect(container.resolve(LocalClass)).toBeNull();
  }

  expect(container.resolve(Example)).not.toBeNull();
  container.override(Example, {
    useValue: 5,
  });
  expect(container.resolve(Example)).toBe(5);
});

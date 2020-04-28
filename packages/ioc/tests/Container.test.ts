import { expect } from "x/expect/mod.ts";
import { Container } from "../src/Container.ts";

declare const Reflect: typeof import("../src/Reflect.d.ts");

Deno.test("Override", () => {
  class Example {}
  const container = new Container();
  container.register(Example);
  container.override(Example, { useValue: 5 });
  expect(container.resolve(Example).get()).toBe(5);
});

Deno.test("Dependencies", () => {
  class A {}

  @Reflect.metadata("inject", true)
  class B {
    constructor(public a: A) {}
  }

  console.log({ ref: Reflect.getMetadata("design:types", B) });

  const container = new Container();

  container.register(B);
  // can't resolve B without A
  expect(() => container.resolve(B).get()).toThrow();

  container.register(A);
  // now it works
  const b: B = container.resolve<B>(B).get()!;

  expect(b).not.toBeUndefined();
  expect(b).toBeInstanceOf(B);

  expect(b).toHaveProperty("a");
  expect(b!.a).toBeInstanceOf(A);
});

Deno.test("Override Dependencies", () => {
  class A {}

  @Reflect.metadata("inject", true)
  class B {
    constructor(public a: A) {}
  }
  @Reflect.metadata("inject", true)
  class C {
    constructor(public b: B) {}
  }

  console.log({ ref: Reflect.getMetadata("design:types", B) });

  const container = new Container();

  container.register(A);
  container.register(B);
  container.register(C);

  container.override(A, {
    useValue: { override: true },
  });

  // now it works
  const c: C = container.resolve<C>(C).get()!;

  expect(c).not.toBeUndefined();
  expect(c).toBeInstanceOf(C);

  expect(c).toHaveProperty("b");
  expect(c!.b).toHaveProperty("a");
  expect(c!.b!.a).toEqual({ override: true });
});

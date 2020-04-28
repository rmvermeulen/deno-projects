import "npm/reflect-metadata/Reflect.js";

import { expect } from "x/expect/mod.ts";

import { Custom, Injectable, IOC_CONFIG } from "../src/Injectable.ts";

declare const Reflect: typeof import("../src/Reflect.d.ts");

@Injectable({ custom: true })
class Example {
  constructor(_n: number, _s: string) {}
  @Custom()
  my_method(a: object, b: boolean, c: Date, d: string): boolean {
    return true;
  }
}

Deno.test("Injectable: has type data", () => {
  expect(
    Reflect.hasMetadata("design:paramtypes", Example),
  ).toBe(true);
  expect(
    Reflect.getMetadata("design:paramtypes", Example),
  ).toEqual([Number, String]);
});

Deno.test("Injectable: has method data", () => {
  expect(
    Reflect.hasMetadata("design:paramtypes", Example.prototype, "my_method"),
  ).toBe(true);
  const [a, b, c, d] = Reflect.getMetadata(
    "design:paramtypes",
    Example.prototype,
    "my_method",
  );
  expect(a).toBe(Object);
  expect(b).toBe(Boolean);
  expect(c).toBe(Date);
  expect(d).toBe(String);

  expect(
    Reflect.hasMetadata(IOC_CONFIG, Example.prototype, "my_method"),
  ).toBe(true);
  expect(
    Reflect.getMetadata(IOC_CONFIG, Example.prototype, "my_method"),
  ).toBe(undefined);

  expect(
    Reflect.hasMetadata("design:returntype", Example.prototype, "my_method"),
  ).toBe(true);
  expect(
    Reflect.getMetadata("design:returntype", Example.prototype, "my_method"),
  ).toBe(Boolean);
});

Deno.test("Injectable: set config", () => {
  expect(Reflect.hasMetadata(IOC_CONFIG, Example)).toBe(true);
  expect(Reflect.getMetadata(IOC_CONFIG, Example)).toEqual({
    shared: true,
    custom: true,
  });
});

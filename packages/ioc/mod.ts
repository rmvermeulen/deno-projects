#! /usr/bin/env deno

// @ts-ignore
import { assert } from "std/testing/asserts.ts";


declare const Reflect: {
  metadata(): void;
  defineMetadata(): void;
  getMetadata(): void;
};

assert(typeof Reflect["metadata"] === "function", "Reflect::metadata missing");
assert(
  typeof Reflect["getMetadata"] === "function",
  "Reflect::getMetadata missing",
);
assert(
  typeof Reflect["defineMetadata"] === "function",
  "Reflect::defineMetadata missing",
);

// @ts-ignore
export { Application } from "./src/Application.ts";
export * as Decorators from "./src/decorators.ts";

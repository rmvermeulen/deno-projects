#! /usr/bin/env deno
import { assert } from "std/testing/asserts.ts";

import "reflect-metadata";

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

export { Application } from "./src/Application.ts";
export * as Decorators from "./src/decorators.ts";

import "npm/reflect-metadata/Reflect.js";

import { expect } from "x/expect/mod.ts";

import {
  InjectDefaults,
  Injectable,
  MK_TYPES,
} from "../src/decorators.ts";

declare const Reflect: typeof import("../src/Reflect.d.ts");

function logType(target: any, key?: string) {
  for (
    const k of [
      "injectable",
      "const",
      "inject",
      "design:type",
      "design:paramtypes",
      "design:returntype",
    ]
  ) {
    if (key) {
      const value = Reflect.hasMetadata(k, target, key) &&
        Reflect.getMetadata(k, target, key);
      if (value) {
        console.log(`--> [${key}]${k} : `, value);
      }
    } else {
      const value = Reflect.hasMetadata(k, target) &&
        Reflect.getMetadata(k, target);
      if (value) {
        console.log(`--> target : ${k} : `, value);
      }
    }
  }
}

class Dep {}

@Reflect.metadata("injectable", true)
class Foobar {
  @Reflect.metadata("inject", true)
  private dep!: Dep;
  constructor(private readonly backup_dep: Dep) {}
  @Reflect.metadata("const", true)
  my_method(items: any[]) {
    return 15;
  }
}

console.log("root");
logType(Foobar);
logType(Foobar.prototype, "dep");
logType(Foobar.prototype, "backup_dep");
logType(Foobar.prototype, "my_method");

Deno.test("Class decorator", () => {});

Deno.test("Method decorator", () => {});

// import "npm/reflect-metadata/Reflect.js"

import { expect } from "x/expect/mod.ts"

import { factory, Injectable } from "./decorators.ts"


const metadataKey = "MyKey"
const metadataValue = { text: "MyValue" }

declare const Reflect: {
    metadata(): void
    defineMetadata(): void
    getMetadata(): void
}

console.log({ Reflect }
    , Reflect.metadata
    , Reflect.defineMetadata
    , Reflect.getMetadata
    , '\n-----')

Deno.test("Decorators etc", () => {

    const __reflect__: any = Reflect;

    // declarative definition of metadata:
    class C {
        @__reflect__.metadata(metadataKey, metadataValue)
        method() {
        }
    }
    // Imperative definition of metadata:
    __reflect__.defineMetadata(metadataKey, metadataValue, C.prototype, "method");

    // Imperative introspection of metadata:
    let obj = new C();
    let result = __reflect__.getMetadata(metadataKey, obj, "method");

    expect(result).toEqual(metadataValue)
})


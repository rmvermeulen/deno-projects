import { expect } from "x/expect/mod.ts"

import { Entity } from "../src/Entity.ts"

Deno.test("Example test", () => {
    expect(Entity).toBeDefined()
})
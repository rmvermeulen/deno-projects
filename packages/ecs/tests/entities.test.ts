import { expect } from "x/expect/mod.ts";

import { OmniSystem, PositionComponent } from "../src/OmniSystem.ts";
import { Vector2 } from "../src/Vector2.ts";

Deno.test("Entities", () => {
    const system = new OmniSystem();
    expect(system).toBeDefined();

    system.position(new PositionComponent(new Vector2(15, 10)))
});

import { assert, assertEquals } from "std/testing/asserts.ts";

import { Maybe } from "@/maybe.ts";

Deno.test("Maybe: ok constructor", async () => {
  const m = Maybe.ok(15);
  let called = false;
  m.map((value) => {
    assertEquals(value, 15, "Wrong value");
    called = true;
  });
  assert(called, "Maybe.map callback not called");
});

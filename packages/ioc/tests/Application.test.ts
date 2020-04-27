import { expect } from "x/expect/mod.ts";
import { Application } from "./Application.ts";

Deno.test("Application", async () => {
  const app = new Application();
  expect(app).toBeDefined();
  app.start();
  await app.close();
});

import { expect } from "x/expect/mod.ts";
import { Application } from "../src/Application.ts";

Deno.test("Application", async () => {
  const app = new Application();
  expect(app).toBeDefined();
  app.start();
  await app.close();
});

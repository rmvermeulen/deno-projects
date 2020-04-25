import { assertEquals } from "std/testing/asserts.ts";
import { App, container } from "alosaur/mod.ts";

import ky from "x/ky/index.js";

import { HomeArea } from "app/home.area.ts";

const api = `http://localhost:7357`;
const route = `${api}/home`;

const checkRoute = async (pending: Promise<any>, fn: any, ...args: any[]) =>
  typeof fn == "function"
    ? pending.then((first: any) => fn(first, ...args))
    : pending.then((first: any) => assertEquals(first, fn, ...args));

Deno.test("HomeController e2e", async () => {
  const app = new App({ areas: [HomeArea] });
  app.listen(api);

  // await Promise.all([
  //   checkRoute(
  //     ky.get(`${route}/text`).text(),
  //     "Hello world",
  //   ),
  //   checkRoute(
  //     ky.get(`${route}/json`).json(),
  //     { text: "test" },
  //   ),
  // ]);

  app.close();
});

import { Singleton } from "x/alosaur/src/mod.ts";

@Singleton()
export class RmvService {
  async get_text() {
    return "Hello world";
  }
  async get_json() {
    return { text: "test" };
  }
}

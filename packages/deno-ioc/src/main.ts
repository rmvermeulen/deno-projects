import "npm/reflect-metadata/Reflect.js";
// import {} from "std/";
// import {} from "x/";
import { Maybe } from "./maybe.ts";

type Tag = string | { name: String };
class Container {
  public resolve<T>(tag: Tag): Maybe<T> {
    return Maybe.none();
  }
  public register<T>(tag: Tag, value: T): void {}
}

class App {
  private container: Container;
  constructor() {
    this.container = new Container();
  }
  start(): void {}
}

const app = new App();

app.start();

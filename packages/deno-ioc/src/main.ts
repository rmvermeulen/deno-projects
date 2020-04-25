// import {} from "std/";
// import {} from "x/";

class Maybe<T> {
  static ok<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static none<T>(): Maybe<T> {
    return new Maybe();
  }

  static map<T, R>(m: Maybe<T>, fn: (value: T) => R): Maybe<R> {
    if (m.hasValue) {
      return Maybe.ok(fn(m.value));
    }
    return Maybe.none();
  }

  private hasValue: boolean;
  private constructor(private value: T = null) {
    this.hasValue = value !== null;
  }

  public map<R>(fn: (value: T) => R): Maybe<R> {
    return Maybe.map(this, fn);
  }
}

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

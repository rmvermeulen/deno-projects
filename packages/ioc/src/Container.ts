import { assert } from "std/testing/asserts.ts";
import maybe, { Maybe } from "x/denofun/maybe.ts";

declare const Reflect: typeof import("./Reflect.d.ts");

type OverrideConfig<T> = {
  useClass: Function;
} | {
  useValue: T;
} | {
  useFactory: <T>() => T;
};

export class Container {
  private cache = new Map<any, any>();
  private mapping = new Map<any, any>();
  private overrides = new Map<any, () => any>();

  public register(_class: Function): void {
    if (this.mapping.has(_class)) {
      throw new Error("Duplicate registered");
    }
    this.mapping.set(_class, _class);
  }
  public resolve<T>(tag: any): Maybe<T> {
    if (this.cache.has(tag)) {
      return maybe(this.cache.get(tag));
    }
    if (this.overrides.has(tag)) {
      const getValue: () => T = this.overrides.get(tag)!;
      const value = getValue();
      this.cache.set(tag, value);
      return maybe(value);
    }
    return maybe(this.mapping.get(tag)).map((_class) => {
      let value;
      const deps: any[] = Reflect.getMetadata("design:paramtypes", _class) ||
        [];
      const args = deps.map((dep) => {
        const arg = this.resolve(dep).get();
        assert(arg, "Unresolved dependency");
        return arg;
      });
      value = new _class(...args);
      console.log("deps  ", { deps, args });

      if (!value) {
        value = new _class();
      }
      this.cache.set(tag, value);
      console.log("info  ", { tag, _class, value });
      return value;
    });
  }

  public override<T>(tag: Function, config: OverrideConfig<T>) {
    if (!this.mapping.has(tag)) {
      throw new Error("No mapping to override");
    }
    if ("useClass" in config) {
      this.overrides.set(tag, () => new (config as any).useClass());
    } else if ("useValue" in config) {
      this.overrides.set(tag, () => (config as any).useValue);
    } else if ("useFactory" in config) {
      this.overrides.set(tag, config.useFactory);
    } else {
      throw new Error(`Invalid override config: ${JSON.stringify(config)}`);
    }
  }
}

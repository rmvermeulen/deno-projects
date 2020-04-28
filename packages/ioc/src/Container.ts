import { assert } from "std/testing/asserts.ts";
import maybe, { Maybe } from "x/denofun/maybe.ts";
import map from "x/denofun/map.ts";
import curry from "x/denofun/curry.ts";
import { IOC_CONFIG, TypeMetadataKey, InjectableConfig } from "./Injectable.ts";

// @ts-ignore
declare const Reflect: typeof import("./Reflect.d.ts");

type MetaGetter = (target: Object, key?: string) => Maybe<Function>;

const metaGetter = <T = Function>(design: TypeMetadataKey) =>
  (target: Object, key?: string): Maybe<T> =>
    maybe(Reflect.getMetadata(design, target, key));

const getConfig: (target: any) => Maybe<InjectableConfig> = metaGetter(
  IOC_CONFIG,
);
const getType: MetaGetter = metaGetter("design:type");
const getParamTypes: MetaGetter = metaGetter("design:paramtypes");
const getReturnType: MetaGetter = metaGetter("design:returntype");

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

  constructor() {
    this.cache.set(Container, this);
  }

  public register(_class: Function): void {
    assert(
      getConfig(_class).get() instanceof Object,
      `Cannot register non-injectable class: '${_class.name}'`,
    );
    if (this.mapping.has(_class)) {
      throw new Error("Duplicate registered");
    }
    this.mapping.set(_class, _class);
  }
  public resolve<T>(tag: any): Maybe<T> {
    const config: InjectableConfig = getConfig(tag).default({ shared: true });

    if (config.shared && this.cache.has(tag)) {
      return maybe(this.cache.get(tag));
    }
    if (this.overrides.has(tag)) {
      const getComponent: () => T = this.overrides.get(tag)!;
      const component = getComponent();
      this.cache.set(tag, component);
      return maybe(component);
    }
    return maybe(this.mapping.get(tag)).map((_class) => {
      const params: Maybe<any[]> = getParamTypes(_class).map(
        curry(map)((dep: Function) => {
          const arg = this.resolve(dep).get();
          assert(arg, `Unresolved dependency (${dep} of ${_class})`);
          return arg;
        }),
      );
      const component = Reflect.construct(_class, params.default([]));

      const setter = curry(Reflect.set)(component);
      for (const key of Reflect.ownKeys(component)) {
        getType(component, key).flatMap((tag) => this.resolve(tag))
          .map(setter(key));
      }
      if (config.shared) {
        this.cache.set(tag, component);
      }
      return component;
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

type Tag = Function;
type Injectable = Function;

type Override = {
  tag: Tag;
  target: Injectable;
};

type Constructable<T> = {
  new (): T;
};

type OverrideConfig<T> = {
  useClass: Constructable<T>;
} | {
  useValue: T;
} | {
  useFactory: <T>() => T;
};

export class Container {
  private mapping = new Map<Tag, Injectable>();
  private overrides = new Map<Tag, Injectable>();
  public register(tag: Tag, target: Injectable = tag) {
    if (this.mapping.has(tag)) {
      throw new Error("Duplicate registered");
    }
    this.mapping.set(tag, target);
  }
  public resolve(tag: Tag): Injectable | null {
    if (this.overrides.has(tag)) {
      const injector = this.overrides.get(tag)!;
      return injector();
    }
    if (this.mapping.has(tag)) {
      return this.mapping.get(tag)!;
    }
    return null;
  }

  public override<T>(tag: Tag, config: OverrideConfig<T>) {
    if (!this.mapping.has(tag)) {
      throw new Error("No mapping to override");
    }
    if ("useClass" in config) {
      this.overrides.set(tag, () => new config.useClass());
    } else if ("useValue" in config) {
      this.overrides.set(tag, () => config.useValue);
    } else if ("useFactory" in config) {
      this.overrides.set(tag, config.useFactory);
    } else {
      throw new Error(`Invalid override config: ${JSON.stringify(config)}`);
    }
  }
}

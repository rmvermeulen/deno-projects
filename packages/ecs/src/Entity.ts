import { Injectable } from "@ioc/mod.ts";

export const Entity = () => Injectable({ shared: false });

@Entity()
export abstract class Component<T> {
  constructor(public value: T) { }
}

export const View = (type: Function): ParameterDecorator => Injectable({ type })

export const System = () => Injectable({ shared: true });

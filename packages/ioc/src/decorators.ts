declare const Reflect: typeof import("./Reflect.d.ts");
import "npm/reflect-metadata/Reflect.js";

export const factory = (dfn: (...args: any[]) => ClassDecorator) => {
  return (...args: any[]) => {
    const decorator = dfn(...args);
    return <TF extends Function>(_class: TF) => decorator(_class);
  };
};

export const MK_TYPES = "design:types";

export const foobar = (options?: any) => Reflect.metadata(MK_TYPES);

export const Injectable = (options?: any): ClassDecorator =>
  <TFunction extends Function>(target: TFunction) =>
    Reflect.defineMetadata(MK_TYPES, options, target);

export const InjectDefaults = (options?: any): PropertyDecorator =>
  (target: object, key: string | symbol) =>
    Reflect.defineMetadata(MK_TYPES, options, target, key);

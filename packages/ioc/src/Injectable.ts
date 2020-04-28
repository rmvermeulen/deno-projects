import "npm/reflect-metadata/Reflect.js";
declare const Reflect: typeof import("./Reflect.d.ts");

export const MK_TYPES = "design:types";
export const MK_PARAM_TYPES = "design:paramtypes";
export const MK_RETURN_TYPE = "design:returntype";

export const IOC_CONFIG = "ioc:config";

export type TypeMetadataKey =
  | typeof IOC_CONFIG
  | "design:type"
  | "design:paramtypes"
  | "design:returntype";

export interface InjectableConfig {
  shared: boolean;
}

const defaultConfig: InjectableConfig = {
  shared: true,
};

export const Injectable = <T>(options?: Partial<InjectableConfig> & T) =>
  Reflect.metadata(IOC_CONFIG, { ...defaultConfig, ...options });

export const Custom = (options?: any): PropertyDecorator =>
  Reflect.metadata(IOC_CONFIG, options);

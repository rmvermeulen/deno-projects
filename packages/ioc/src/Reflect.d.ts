

declare namespace Reflect {
  function metadata<T>(key: string, value: T): PropertyDecorator;
  function defineMetadata<T, C>(key: string, value: T, proto: C, method?: string): void;

  function getMetadata<T>(key: string, obj: object, method?: string): T;
  function getOwnMetadata<T>(key: string, obj: object, method?: string): T;

  function hasMetadata(key: string, object: object, method?: string): boolean;
  function hasOwnMetadata(key: string, object: object, method?: string): boolean;
}
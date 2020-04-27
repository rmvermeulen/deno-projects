import 'npm/reflect-metadata/Reflect.js'


export const factory =
  (dfn: (...args: any[]) => ClassDecorator) => {
    return (...args: any[]) => {
      const decorator = dfn(...args);
      return <TF extends Function>(_class: TF) =>
        decorator(_class)
    };
  }

export const Injectable: ClassDecorator =
  <TF extends Function>(_class: TF) => {
    // Reflect.
    return _class;
  };

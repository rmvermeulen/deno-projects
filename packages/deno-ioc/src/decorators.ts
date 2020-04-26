export function factory(dfn: (...args: any[]) => ClassDecorator) {
  return function (...args: any[]) {
    const decorator = dfn(...args);
    return function (_class) {
      return decorator(_class);
    };
  };
}

export const Injectable: ClassDecorator = (_class) => {
  return _class;
};

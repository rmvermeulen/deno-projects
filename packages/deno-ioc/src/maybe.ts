export class Maybe<T> {
  static ok<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static none<T>(): Maybe<T> {
    return new Maybe(null as any as T);
  }

  static map<T, R>(m: Maybe<T>, fn: (value: T) => R): Maybe<R> {
    if (m._value !== null) {
      return Maybe.ok(fn(m._value));
    }
    return Maybe.none();
  }

  private _hasValue: boolean;
  private constructor(
    private readonly _value: T | null,
  ) {
    this._hasValue = _value !== null;
  }

  public isOk(): boolean {
    return this._hasValue;
  }

  public map<R>(fn: (value: T) => R): Maybe<R> {
    return Maybe.map(this, fn);
  }
}

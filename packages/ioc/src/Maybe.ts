export class Maybe<T> {
  static some<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static none<T>(): Maybe<T> {
    return new Maybe(null as any as T);
  }

  static isSome<T>(m: Maybe<T>): boolean {
    return m.isSome();
  }

  static isNone<T>(m: Maybe<T>): boolean {
    return m.isNone();
  }

  static map<T, R>(m: Maybe<T>, fn: (value: T) => R): Maybe<R> {
    if (m._value !== null) {
      return Maybe.some(fn(m._value));
    }
    return Maybe.none();
  }

  static map2<T1, T2, R>(
    m1: Maybe<T1>,
    m2: Maybe<T2>,
    fn: (v1: T1, v2: T2) => R,
  ): Maybe<R> {
    if (m1.isNone() || m2.isNone()) {
      return Maybe.none();
    }
    return Maybe.some(fn(m1._value!, m2._value!));
  }

  private readonly _hasValue: boolean;
  private constructor(
    private readonly _value: T | null,
  ) {
    this._hasValue = _value !== null;
  }

  public value() {
    if (!this._hasValue) {
      throw new Error("Maybe.none value accessed");
    }
    return this._value;
  }

  public isSome(): boolean {
    return this._hasValue;
  }
  public isNone(): boolean {
    return !this._hasValue;
  }

  public map<R>(fn: (value: T) => R): Maybe<R> {
    return Maybe.map(this, fn);
  }
}

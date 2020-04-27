export class Maybe<T> {
  static just<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe(null as any as T);
  }

  static isJust<T>(m: Maybe<T>): boolean {
    return m.isJust();
  }

  static isNothing<T>(m: Maybe<T>): boolean {
    return m.isNothing();
  }

  static map<T, R>(m: Maybe<T>, fn: (value: T) => R): Maybe<R> {
    if (m._value !== null) {
      return Maybe.just(fn(m._value));
    }
    return Maybe.nothing();
  }

  static map2<T1, T2, R>(
    m1: Maybe<T1>,
    m2: Maybe<T2>,
    fn: (v1: T1, v2: T2) => R,
  ): Maybe<R> {
    if (m1.isNothing() || m2.isNothing()) {
      return Maybe.nothing();
    }
    return Maybe.just(fn(m1._value!, m2._value!));
  }

  private readonly _hasValue: boolean;
  private constructor(
    private readonly _value: T | null,
  ) {
    this._hasValue = _value !== null;
  }

  public value() {
    if (!this._hasValue) {
      throw new Error("Maybe.nothing value accessed");
    }
    return this._value;
  }

  public isJust(): boolean {
    return this._hasValue;
  }
  public isNothing(): boolean {
    return !this._hasValue;
  }

  public map<R>(fn: (value: T) => R): Maybe<R> {
    return Maybe.map(this, fn);
  }
}

import { Injectable } from "@ioc/mod.ts";
class Vector2 {
  public x: number;
  public y: number;
  constructor(x: number | Record<"x" | "y", number> = 0, y: number = 0) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y;
    } else {
      this.x = x.x;
      this.x = x.y;
    }
  }
}

@Injectable({ shared: false })
export class Component<T> {
  data: T;
}

export const Entity = () => Injectable({ shared: false });

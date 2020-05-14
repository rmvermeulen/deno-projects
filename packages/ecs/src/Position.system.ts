import { View, System } from "./Entity.ts";
import { Vector2 } from "./Vector2.ts";

@System()
export class PositionSystem {
  constructor(
    private pos: View<Vector2>,
  ) {}

  public update(delta: number, entityId: number) {
    const pos = this.pos.get();
    pos.y += 10; // gravity
    this.pos.set(pos);
  }
}

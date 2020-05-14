import { System, View, Component } from "./Entity.ts";
import { Vector2 } from "./Vector2.ts";

export class PositionComponent extends Component<Vector2> {
    constructor(pos: Vector2) { super(pos) }

    get() {
        return this.value
    }
}
export class BodyComponent extends Component<{ body: boolean }> {
    constructor(body: { body: boolean }) { super(body) }
}

@System()
export class OmniSystem {
    public position(@View(PositionComponent) pos: PositionComponent) {
        pos.value.y += 10
        console.log(pos)
    }

    public collision(
        @View(BodyComponent) a: BodyComponent,
        @View(BodyComponent) b: BodyComponent,
    ) {
        console.log(`${a} hit ${b}!`)
    }
}
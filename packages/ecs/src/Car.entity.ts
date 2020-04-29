import { Entity, Component } from "./Entity.ts";

@Entity()
export class Car {
  constructor(
    private pos: Component<{ x: number; y: number }>,
    private health: Component<number>,
    private engine: Component<{
      type: string;
      hp: number;
    }>,
  ) {}
}

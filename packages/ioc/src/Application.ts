import { Container } from "./container.ts";

export class Application {
  private container = new Container();
  constructor() {
  }
  start(): void {
  }

  async close(): Promise<void> {
  }
}

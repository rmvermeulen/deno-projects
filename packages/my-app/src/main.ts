import { Container, Injectable } from "@ioc/mod.ts";

@Injectable({ shared: false })
class Human {
  static count: number = 0;
  name: string;
  constructor() {
    this.name = [
      "Alice",
      "Bob",
      "Candace",
      "Dave",
      "Ellie",
    ][Math.floor(Math.random() * 5)];
    this.name += Human.count;
    Human.count += 1;
  }
}
@Injectable()
class CEO {
  constructor(public human: Human) {}
}

@Injectable()
class WorkForce {
  constructor(public human: Human) {}
}

@Injectable()
class Company {
  constructor(public ceo: CEO, public workforce: WorkForce) {}
}

const container = new Container();
container.register(Human);
container.register(CEO);
container.register(WorkForce);
container.register(Company);

console.log("company", JSON.stringify(
  container.resolve(Company),
  null,
  2,
));

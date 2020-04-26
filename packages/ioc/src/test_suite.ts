import { it } from "x/expect/mod.ts";

export const suite = (suiteName: string) =>
  (testName: string, testFN: () => void | Promise<void>) =>
    it(`${suiteName}::${testName}`, testFN);

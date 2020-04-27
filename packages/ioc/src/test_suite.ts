import { it, expect } from "x/expect/mod.ts";

export { expect }

export const suite = (suiteName: string) =>
  (testName: string, testFN: () => void | Promise<void>) =>
    it(`${suiteName}::${testName}`, testFN);

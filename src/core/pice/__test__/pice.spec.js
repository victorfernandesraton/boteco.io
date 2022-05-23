import { Pice } from "../pice";
describe("Pice", () => {
  test("should be create a single pice", () => {
    const pice = Pice.create(1, 4);
    expect(pice.getLeft()).toEqual(1);
    expect(pice.getRight()).toEqual(4);
    expect(pice.isSame()).toBeFalsy();
  });
});

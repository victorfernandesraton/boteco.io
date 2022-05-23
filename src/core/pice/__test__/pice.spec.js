import { OfPeaceRangeError } from "src/core/errors/ofPeaceRangeError";
import { Pice } from "../pice";
describe("Pice", () => {
  test("should be create a single pice", () => {
    const pice = Pice.create(1, 4);
    expect(pice.getLeft()).toEqual(1);
    expect(pice.getRight()).toEqual(4);
    expect(pice.isSame()).toBeFalsy();
  });

  test("should be create a same pice like", () => {
    const pice = Pice.create(4, 4);
    expect(pice.getLeft()).toEqual(4);
    expect(pice.getRight()).toEqual(4);
    expect(pice.isSame()).toBeTruthy();
  });

  test("should throw beccause one of values exced a valid kehy", () => {
    expect(() => Pice.create(4, 7)).toThrowError(OfPeaceRangeError);
    expect(() => Pice.create(7, 4)).toThrowError(OfPeaceRangeError);
  });

  test("should throw beccause one of values is lower a valid kehy", () => {
    expect(() => Pice.create(4, 0)).toThrowError(OfPeaceRangeError);
    expect(() => Pice.create(0, 4)).toThrowError(OfPeaceRangeError);
  });
});

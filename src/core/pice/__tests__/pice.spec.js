import { InvalidPeaceError } from "../../errors/invalidPeaceError.mjs";
import { OfPeaceRangeError } from "../../errors/ofPeaceRangeError.mjs";
import { Pice } from "../pice.mjs";
describe("Pice", () => {
  test("should be create a single pice", () => {
    const pice = Pice.create(1, 4);
    expect(pice.getLeft()).toEqual(1);
    expect(pice.getRight()).toEqual(4);
    expect(pice.isSame()).toBeFalsy();
    expect(pice.getKey()).toEqual(`1:4`);
  });

  test("should be create a same pice like", () => {
    const pice = Pice.create(4, 4);
    expect(pice.getLeft()).toEqual(4);
    expect(pice.getRight()).toEqual(4);
    expect(pice.isSame()).toBeTruthy();
    expect(pice.getKey()).toEqual(`4:4`);
  });

  test("should be create and balance left and right", () => {
    const pice = Pice.create(4, 0);
    expect(pice.getLeft()).toEqual(0);
    expect(pice.getRight()).toEqual(4);
    expect(pice.isSame()).toBeFalsy();
    expect(pice.getKey()).toEqual(`0:4`);
  });

  test("should be a pice connect in left another", () => {
    const pice = Pice.create(1, 4);
    const anotherPice = Pice.create(0, 1);
    expect(pice.connectTo(anotherPice)).toEqual("left");
  });

  test("should be a pice connect in right another", () => {
    const pice = Pice.create(1, 4);
    const anotherPice = Pice.create(4, 1);
    expect(pice.connectTo(anotherPice)).toEqual("right");
  });

  test("should be a pice connect in both side", () => {
    const pice = Pice.create(4, 4);
    const anotherPice = Pice.create(4, 1);
    expect(pice.connectTo(anotherPice)).toEqual("both");
  });

  test("should be a pice not connect", () => {
    const pice = Pice.create(1, 4);
    const anotherPice = Pice.create(3, 6);
    expect(pice.connectTo(anotherPice)).toEqual("none");
  });
  test("should throw beccause one of values exced a valid kehy", () => {
    expect(() => Pice.create(4, 7)).toThrowError(OfPeaceRangeError);
    expect(() => Pice.create(7, 4)).toThrowError(OfPeaceRangeError);
  });

  test("should throw beccause one of values is lower a valid kehy", () => {
    expect(() => Pice.create(4, -1)).toThrowError(OfPeaceRangeError);
    expect(() => Pice.create(-1, 4)).toThrowError(OfPeaceRangeError);
  });

  test("should throw beccause use invalid values", () => {
    expect(() => Pice.create("4", 1)).toThrowError(InvalidPeaceError);
    expect(() => Pice.create(1, [])).toThrowError(InvalidPeaceError);
  });
});

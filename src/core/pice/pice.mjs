import { InvalidPeaceError } from "../errors/invalidPeaceError.mjs";
import { OfPeaceRangeError } from "../errors/ofPeaceRangeError.mjs";

export class Pice {
  #left;
  #right;
  #key;
  #same;
  constructor(left, right) {
    if (left > right) {
      this.#left = right;
      this.#right = left;
      this.#key = `${right}:${left}`;
    } else {
      this.#left = left;
      this.#right = right;
      this.#key = `${left}:${right}`;
    }
    this.#same = left === right;
  }

  getKey() {
    return this.#key;
  }

  /**
   * @returns {Array<number>}
   */
  getPairs() {
    return this.getKey()
      .split(":")
      .map((item) => parseInt(item, 10));
  }

  getLeft() {
    return this.#left;
  }

  getRight() {
    return this.#right;
  }

  isSame() {
    return this.#same;
  }

  /**
   *
   * @param {Pice} anotherPice
   * @returns {string}
   */
  connectTo(anotherPice) {
    if (!anotherPice) {
      return "none";
    }
    if (
      anotherPice.getLeft() === this.getRight() ||
      anotherPice.getRight() === this.getRight()
    ) {
      return this.isSame() ? "both" : "right";
    } else if (
      anotherPice.getLeft() === this.getLeft() ||
      anotherPice.getRight() === this.getLeft()
    ) {
      return this.isSame() ? "both" : "left";
    } else {
      return "none";
    }
  }

  /**
   *
   * @param {string} key
   */
  static createFromString(key) {
    const [right, left] = key
      .split(":")
      .sort()
      .map((item) => parseInt(item, 10));
    return Pice.create(left, right);
  }
  static create(left, right) {
    if (typeof left != "number" || typeof right != "number") {
      throw new InvalidPeaceError();
    }
    if (left < 0 || left > 6 || right < 0 || right > 6) {
      throw new OfPeaceRangeError();
    }

    return new Pice(left, right);
  }
}

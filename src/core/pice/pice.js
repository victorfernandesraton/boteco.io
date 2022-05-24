import { InvalidPeaceError } from "../errors/invalidPeaceError";
import { OfPeaceRangeError } from "../errors/ofPeaceRangeError";

export class Pice {
  constructor(left, right) {
    if (left > right) {
      this.left = right;
      this.right = left;
      this.key = `${right}:${left}`;
    } else {
      this.left = left;
      this.right = right;
      this.key = `${left}:${right}`;
    }
    this.same = left === right;
  }

  getKey() {
    return this.key;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }

  isSame() {
    return this.same;
  }

  /**
   *
   * @param {Pice} anotherPice
   * @returns {string}
   */
  connectTo(anotherPice) {
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

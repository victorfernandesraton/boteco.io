import { InvalidPeaceError } from "../errors/invalidPeaceError";
import { OfPeaceRangeError } from "../errors/ofPeaceRangeError";

export class Pice {
  constructor(left, right) {
    if (left > right) {
      this.left = right;
      this.right = left;
    } else {
      this.left = left;
      this.right = right;
    }
    this.same = left === right;
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

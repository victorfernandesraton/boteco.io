import { InvalidPeaceError } from "../errors/invalidPeaceError";
import { OfPeaceRangeError } from "../errors/ofPeaceRangeError";

export class Pice {
  constructor(left, right) {
    this.left = left;
    this.right = right;
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
    if ((left < 1 && left > 6) || (right < 1 && right > 6)) {
      throw new OfPeaceRangeError();
    }

    return new Pice(left, right);
  }
}

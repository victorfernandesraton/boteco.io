import { randomUUID } from "crypto";

export class Uniqueid {
  #id;
  constructor(id) {
    if (id) {
      this.#id = id;
    } else {
      this.#id = randomUUID();
    }
  }

  /**
   *
   * @returns {string}
   */
  getValue() {
    return this.#id;
  }

  /**
   *
   * @param {Uniqueid} id
   * @returns {boolean}
   */
  isEqual(id) {
    return this.isEqualString(id.getValue());
  }

  /**
   *
   * @param {string} id
   * @returns {boolean}
   *
   */
  isEqualString(id) {
    return this.getValue() === id;
  }

  /**
   *
   * @param {string | undefined} id
   * @returns {Uniqueid}
   */
  static create(id) {
    return new Uniqueid(id);
  }
}

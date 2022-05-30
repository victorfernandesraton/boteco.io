import { Pice } from "../pice/pice.mjs";
import { Uniqueid } from "../uniqueId/uniqueId.mjs";

export class Player {
  #id;
  #name;
  #deck;
  /**
   *
   * @param {{
   * id: string, name: string, deck: Map<string, Pice>}} param0
   */
  constructor({ name, id, deck }) {
    if (id) {
      this.#id = id;
    } else {
      this.#id = Uniqueid.create();
    }
    this.#deck = deck;
    this.#name = name;
  }
  /**
   *
   * @returns {Uniqueid}
   */
  getId() {
    return this.#id;
  }
  /**
   *
   * @returns {string}
   */
  getName() {
    return this.#name;
  }
  /**
   *
   * @returns {Map<string, Pice>}
   */
  getDeck() {
    return this.#deck;
  }
}

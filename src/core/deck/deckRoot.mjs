import { Pice } from "../pice/pice.mjs";
import { DeckNode } from "./deckNode.mjs";

export class DeckRoot {
  /**
   *
   * @param {Pice} node
   * @param {string} left
   * @param {string} right
   */
  constructor(node, left, right) {
    this.node = node;
    if (left) {
      this.left = left;
    }
    if (right) {
      this.right = right;
    }
  }

  changeleft(pice) {
    this.left = pice;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }

  getNode() {
    return this.node;
  }

  /**
   *
   * @param {{
   * node: Pice, left?: string, right?: string}}
   * @returns
   */
  static create({ node, left, right }) {
    return new DeckRoot(node, left, right);
  }
}

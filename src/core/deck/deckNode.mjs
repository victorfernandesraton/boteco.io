import { Pice } from "../pice/pice.mjs";

export class DeckNode {
  /**
   *
   * @param {Pice} node
   * @param {string?} parent
   * @param {string?} child
   */
  constructor(node, parent, child) {
    this.node = node;
    if (parent) {
      this.parent = parent;
    }
    if (child) {
      this.child = child;
    }
  }

  changeParent(pice) {
    this.parent = pice;
  }

  getParent() {
    return this.parent;
  }

  getChild() {
    return this.child;
  }

  getNode() {
    return this.node;
  }

  /**
   *
   * @param {Pice} node
   * @param {string?} parent
   * @param {string?} child
   */
  static create(node, parent, child) {
    return new DeckNode(node, parent, child);
  }
}

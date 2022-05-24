import { Pice } from "../pice/pice";

export class DeckNode {
  /**
   *
   * @param {Pice} node
   * @param {Pice} parent
   * @param {Pice} child
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
   * @param {Pice?} parent
   * @param {Pice?} child
   */
  static create(node, parent, child) {
    return new DeckNode(node, parent, child);
  }
}

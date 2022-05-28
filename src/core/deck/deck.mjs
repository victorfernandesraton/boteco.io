import { NotValidPiceToAppendInDeck } from "../errors/notValidPiceToAppendInDeck.mjs";
import { Pice } from "../pice/pice.mjs";
import { DeckNode } from "./deckNode.mjs";

export class Deck {
  /**
   * @param {DeckNode} root
   * @param {Pice} left
   * @param {Pice} right
   */
  constructor(root) {
    this.root = root;
    this.pices = new Map();
    this.pices.set(root.getNode().getKey(), root);
    this.left = root.node;
    this.right = root.node;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }

  getRoot() {
    return this.root;
  }

  getPices() {
    return this.pices;
  }

  /**
   * @param {Pice} root
   */
  static create(root) {
    const rootNode = DeckNode.create(root);
    return new Deck(rootNode);
  }
  /**
   *
   * @param {string} piceKey
   */
  push(picekey) {
    const [right, left] = picekey
      .split(":")
      .sort()
      .map((item) => parseInt(item, 10));
    const pice = Pice.create(left, right);
    const connectRight = this.right.connectTo(pice);
    const connectLeft = this.left.connectTo(pice);

    if (["left", "right", "both"].includes(connectLeft)) {
      this.pusher(pice, "left");
      return;
    }

    if (["left", "right", "both"].includes(connectRight)) {
      this.pusher(pice, "right");
      return;
    }

    throw NotValidPiceToAppendInDeck();
  }

  /**
   *
   * @param {Pice} pice
   * @param {string} parentKey
   */
  pusher(pice, parentKey) {
    const parentPice = parentKey === "left" ? this.getLeft() : this.getRight();
    const piceNode = DeckNode.create(pice, parentPice.getKey());
    const previous = this.pices.get(parentPice.getKey()).getParent();
    this.pices.set(pice.getKey(), piceNode);
    this.pices.set(
      parentPice.getKey(),
      DeckNode.create(parentPice, previous, pice.getKey())
    );
    if (parentKey == "left") {
      this.left = pice;
    } else {
      this.right = pice;
    }
  }
}

import { NotValidPiceToAppendInDeck } from "../errors/notValidPiceToAppendInDeck";
import { Pice } from "../pice/pice";
import { DeckNode } from "./deckNode";

export class Deck {
  /**
   * @param {DeckNode} root
   * @param {Pice} left
   * @param {Pice} right
   */
  constructor(root) {
    this.root = root;
    this.pices = new Array(28);
    this.pices.push(root);
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
   * @param {Pice} piceString
   */
  push(pice) {
    const connectRight = this.right.connectTo(pice);
    const connectLeft = this.left.connectTo(pice);

    const piceNode = DeckNode.create(pice);
    let tempPices;
    if (["left", "right", "both"].includes(connectLeft)) {
      tempPices = this.pices.filter(
        (item) => item.getNode().getKey() !== this.left.getKey()
      );
      piceNode.changeParent(this.left);
      tempPices.unshift(
        DeckNode.create(this.left, tempPices?.[0]?.getNode?.(), pice)
      );
      tempPices.unshift(piceNode);
      this.pices = tempPices;
      this.left = pice;
      return;
    }

    if (["left", "right", "both"].includes(connectRight)) {
      tempPices = this.pices.filter(
        (item) => item.getNode().getKey() !== this.right.getKey()
      );
      piceNode.changeParent(this.right);
      tempPices.push(piceNode);
      tempPices.push(
        DeckNode.create(
          this.right,
          tempPices?.[tempPices.length - 1]?.getNode?.(),
          pice
        )
      );
      this.pices = tempPices;
      this.right = pice;
      return;
    }

    throw NotValidPiceToAppendInDeck();
  }
}

import { DuplicatedPiceInDeck } from "../errors/duplicatedPiceInDeck.mjs";
import { NotValidPiceToAppendInDeck } from "../errors/notValidPiceToAppendInDeck.mjs";
import { Pice } from "../pice/pice.mjs";
import { DeckRoot } from "./deckRoot.mjs";

export class Deck {
  /**
   * @param {Pice} root
   */
  constructor(root) {
    const rootInstance = DeckRoot.create({ node: root });
    this.root = rootInstance;
    this.pices = new Map();
    this.pices.set(root.getKey(), root);
    this.picesArray = new Array();
    this.picesArray.push(root.getKey());
    this.left = root.getLeft();
    this.right = root.getRight();
  }

  /**
   *
   * @returns {number}
   */
  getLeft() {
    return this.left;
  }
  /**
   *
   * @returns {number}
   */
  getRight() {
    return this.right;
  }
  /**
   *
   * @returns {DeckRoot}
   */
  getRoot() {
    return this.root;
  }

  /**
   *
   * @returns {Map<string, Pice>}
   */
  getPices() {
    return this.pices;
  }
  /**
   *
   * @returns {Array<string>}
   */
  getPicesArray() {
    return this.picesArray;
  }

  /**
   * @param {string} root
   * @returns {Deck}
   */
  static create(root) {
    return new Deck(Pice.createFromString(root));
  }
  /**
   *
   * @param {string} piceKey
   */
  push(picekey) {
    const pice = Pice.createFromString(picekey);
    if (this.pices.has(pice.getKey())) {
      throw new DuplicatedPiceInDeck();
    }
    if (pice.getKey().includes(`${this.getLeft()}`)) {
      if (!this.getRoot().getLeft()) {
        this.root.left = pice;
        this.updateOnPush(pice, true, true);
      } else {
        this.updateOnPush(pice, true, false);
      }
      this.left = pice.getPairs().find((item) => item != this.getLeft());
    } else if (pice.getKey().includes(`${this.getRight()}`)) {
      if (!this.getRoot().getRight()) {
        this.root.right = pice;
        this.updateOnPush(pice, false, true);
      } else {
        this.updateOnPush(pice, false, false);
      }
      this.right = pice.getPairs().find((item) => item != this.getRight());
    } else {
      throw NotValidPiceToAppendInDeck();
    }
  }

  /**
   *
   * @param {Pice} pice
   * @param {boolean} isLeft
   * @param {boolean} isRoot
   */
  updateOnPush(pice, isLeft, isRoot) {
    const parent = isRoot
      ? this.getRoot().getNode()
      : Pice.createFromString(
          this.getPicesArray()[isLeft ? 0 : this.getPicesArray.length - 1]
        );
    if (!this.getPices().has(parent.getKey())) {
      throw NotValidPiceToAppendInDeck();
    }
    this.pices.set(pice.getKey(), pice);
    if (isLeft) {
      this.picesArray.unshift(pice.getKey());
    } else {
      this.picesArray.push(pice.getKey());
    }
  }
}

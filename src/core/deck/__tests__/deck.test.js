import { DuplicatedPiceInDeck } from "../../errors/duplicatedPiceInDeck.mjs";
import { NotValidPiceToAppendInDeck } from "../../errors/notValidPiceToAppendInDeck.mjs";
import { Pice } from "../../pice/pice.mjs";
import { Deck } from "../deck.mjs";
describe("deck.js", () => {
  it("shoud be a simple game", () => {
    const deck = Deck.create("1:6");
    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(1);
    expect(deck.getRight()).toEqual(6);
    expect(deck.getPicesArray()).toEqual(["1:6"]);

    deck.push("1:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(4);
    expect(deck.getRight()).toEqual(6);
    expect(deck.getPicesArray()).toEqual(["1:4", "1:6"]);

    deck.push("3:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(6);
    expect(deck.getPicesArray()).toEqual(["3:4", "1:4", "1:6"]);

    deck.push("6:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(4);
    expect(deck.getPicesArray()).toEqual(["3:4", "1:4", "1:6", "4:6"]);

    expect(deck.getPicesArray()).toHaveLength(4);
    expect(deck.getPices().size).toEqual(4);
  });

  it("shoud be a simple start with bucha", () => {
    const deck = Deck.create("6:6");
    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(6);
    expect(deck.getRight()).toEqual(6);

    deck.push("6:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(4);
    expect(deck.getRight()).toEqual(6);

    deck.push("3:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(6);

    expect(deck.getPicesArray()).toHaveLength(3);
    expect(deck.getPices().size).toEqual(3);
  });
  it("should throw because try push inconsistent pice", () => {
    const WithBucha = Deck.create("6:6");
    expect(WithBucha.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(WithBucha.getLeft()).toEqual(6);
    expect(WithBucha.getRight()).toEqual(6);

    expect(() => WithBucha.push("1:3")).toThrowError(
      NotValidPiceToAppendInDeck
    );

    const deck = Deck.create("1:6");
    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(1);
    expect(deck.getRight()).toEqual(6);

    expect(() => deck.push("5:3")).toThrowError(NotValidPiceToAppendInDeck);

    deck.push("1:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(4);
    expect(deck.getRight()).toEqual(6);

    deck.push("3:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(6);

    expect(() => deck.push("0:4")).toThrowError(NotValidPiceToAppendInDeck);
    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(6);
  });
  it("should throw because try push duplicated pice", () => {
    const WithBucha = Deck.create("6:6");
    expect(WithBucha.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(WithBucha.getLeft()).toEqual(6);
    expect(WithBucha.getRight()).toEqual(6);

    expect(() => WithBucha.push("6:6")).toThrowError(DuplicatedPiceInDeck);

    const deck = Deck.create("1:6");
    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(1);
    expect(deck.getRight()).toEqual(6);

    expect(() => deck.push("1:6")).toThrowError(DuplicatedPiceInDeck);

    deck.push("1:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(4);
    expect(deck.getRight()).toEqual(6);

    deck.push("3:4");

    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(6);

    expect(() => deck.push("1:6")).toThrowError(DuplicatedPiceInDeck);
    expect(deck.getRoot().getNode()).toBeInstanceOf(Pice);
    expect(deck.getLeft()).toEqual(3);
    expect(deck.getRight()).toEqual(6);
  });
});

import { Pice } from "../../pice/pice.mjs";
import { Deck } from "../deck.mjs";
describe("deck.js", () => {
  it("shoud be a simple game", () => {
    const rootPice = Pice.create(6, 6);
    const deck = Deck.create(rootPice);
    expect(deck.getLeft().getKey()).toEqual("6:6");
    expect(deck.getRight().getKey()).toEqual("6:6");
    expect(deck.getRoot().getNode().getKey()).toEqual("6:6");

    const firstPice = Pice.create(1, 6);
    const secondLeftPice = Pice.create(1, 3);

    deck.push(firstPice.getKey());
    expect(deck.getLeft().getKey()).toEqual("1:6");
    expect(deck.getRight().getKey()).toEqual("6:6");
    expect(deck.getRoot().getNode().getKey()).toEqual("6:6");

    deck.push(secondLeftPice.getKey());
    expect(deck.getLeft().getKey()).toEqual("1:3");
    expect(deck.getRight().getKey()).toEqual("6:6");
    expect(deck.getRoot().getNode().getKey()).toEqual("6:6");

    const thirdPice = Pice.create(5, 3);
    deck.push(thirdPice.getKey());
    expect(deck.getLeft().getKey()).toEqual("3:5");
    expect(deck.getRight().getKey()).toEqual("6:6");
    expect(deck.getRoot().getNode().getKey()).toEqual("6:6");

    const fourthPice = Pice.create(6, 0);
    deck.push(fourthPice.getKey());

    expect(deck.getLeft().getKey()).toEqual("3:5");
    expect(deck.getRight().getKey()).toEqual("0:6");
    expect(deck.getRoot().getNode().getKey()).toEqual("6:6");
  });
});

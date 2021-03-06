import { Deck } from "../deck/deck.mjs";
import { InvalidPlayersListError } from "../errors/invalidPlayersListError.mjs";
import { Pice } from "../pice/pice.mjs";
import { Player } from "../player/player.mjs";

export class Domino {
  #deck;
  #players = new Map();
  #moves = new Array();

  /**
   *
   * @param {Deck?} deck
   * @param {Player[]?} players
   */
  constructor(deck, players) {
    if (players.length > 4) {
      throw new InvalidPlayersListError();
    }
    if (deck) {
      this.#deck = deck;
    }
    if (players) {
      for (const player in players) {
        this.#appendInternalPlayer(player);
      }
    }
  }

  /**
   *
   * @param {Player[]} players
   */
  static create(players) {
    if (players.length > 4) {
      throw new InvalidPlayersListError();
    }
    for (const player of players) {
      this.#appendInternalPlayer(player);
    }
  }
  /**
   *
   * @param {Player} player
   */
  appendPlayer(player) {
    if (this.#players.size() >= 4) {
      throw new InvalidPlayersListError();
    }
    this.#appendInternalPlayer(player);
  }

  /**
   *
   * @param {Player} player
   */
  #appendInternalPlayer(player) {
    this.#players.set(player.getKey(), player);
  }

  /**
   *
   * @param {string} palyerId
   * @param {string} pice
   */
  makeMove(palyerId, piceId) {
    if (!this.#players.has(palyerId)) {
      throw new Error();
    }

    if (!this.#deck) {
      this.#deck = Deck.create(piceId);
    } else {
      this.#deck.push(piceId);
    }

    this.#moves.push({ player: palyerId, pice: Pice.createFromString(piceId) });
  }
}

import {Side} from "./Side";

export class StepResponse {
  gameId: string;
  gameOver: boolean;
  winner: Side;

  constructor(gameId: string, gameOver: boolean, winner: Side) {
    this.gameId = gameId;
    this.gameOver = gameOver;
    this.winner = winner;
  }

}

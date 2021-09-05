import {Side} from "./Side";

export class Scores {
  side: Side;
  score: number;

  constructor(side: Side, score: number) {
    this.score = score;
    this.side = side;
  }
}

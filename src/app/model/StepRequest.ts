import {Side} from "./Side";
import {Field} from "./Field";

export class StepRequest {
  gameId: string;
  player: Side;
  field: Field;

  constructor(gameId: string, player: Side, field: Field) {
    this.gameId = gameId;
    this.player = player;
    this.field = field;
  }
}

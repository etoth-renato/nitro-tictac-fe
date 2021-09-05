import {Side} from "./Side";

export class FieldUI {
  side: Side;
  x: number;
  y: number;

  constructor(side: Side, x: number, y: number) {
    this.side = side;
    this.x = x;
    this.y = y;
  }
}

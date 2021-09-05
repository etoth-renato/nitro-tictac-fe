import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../services/DataService.service";
import {StepRequest} from "../model/StepRequest";
import * as uuid from 'uuid';
import {Side} from "../model/Side";
import {Field} from "../model/Field";
import {Scores} from "../model/Scores";
import {FieldUI} from "../model/FieldUI";
import {StepResponse} from "../model/StepResponse";


@Component({
  selector: 'tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  ngOnInit(): void {
    this.newGame();
  }

  constructor(public http: HttpClient, private dataService: DataService) {

  }

  side = Side;

  turn = true;
  gameId = "";

  scoreboard: Scores[] | undefined;
  board: FieldUI[] = [];
  gameResult: StepResponse | undefined;

  playerTurn(): Side {
    return this.turn ? Side.X : Side.O;
  }

  newGame() {
    this.gameId = uuid.v4();
    this.refreshTable();
    this.gameResult = undefined;
    this.getScoreboard();
  }

  findField(x: number, y: number): Side {
    let item = this.board.filter(e => e.x == x && e.y == y)[0];
    return item ? item.side : Side.EMPTY;
  }

  move(x: number, y: number) {
    let request = new StepRequest(this.gameId, this.playerTurn(), new Field(x, y))
    this.dataService.move(request).subscribe(resp => {
      if (resp.gameOver) {
        this.gameResult = resp;
        this.getScoreboard();
        console.log(this.scoreboard);
      } else {
        this.turn = !this.turn;
      }
      this.refreshTable();
    }, error => {
      console.log(error);
    })
  }

  getScoreboard() {
    this.dataService.getScores().subscribe(scores => {
      console.log(scores)
      this.scoreboard = scores;
    }, error => {
      console.log(error);
    })
  }

  refreshTable() {
    this.board = [];
    this.dataService.getBoard(this.gameId).subscribe(data => {
        this.board = data;
      }
    );
  }


  createRange(number: number) {
    return new Array(number);
  }

}

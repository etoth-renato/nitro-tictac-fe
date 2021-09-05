import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StepRequest} from "../model/StepRequest";
import {StepResponse} from "../model/StepResponse";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Scores} from "../model/Scores";
import {FieldUI} from "../model/FieldUI";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }


  public getBoard(gameId: string): Observable<FieldUI[]> {
    return this.httpClient.get<FieldUI[]>(this.REST_API_SERVER + "/api/game/" + gameId).pipe(map(data => data));
  }

  public move(request: StepRequest) {
    return this.httpClient.post<StepResponse>(this.REST_API_SERVER + "/api/game", request).pipe(map((data: any) => new StepResponse(data.gameId, data.gameOver, data.winner)));
  }


  public getScores(): Observable<Scores[]> {
    return this.httpClient.get<Scores[]>(this.REST_API_SERVER + "/api/scoreboard").pipe(map(data => data));
  }
}

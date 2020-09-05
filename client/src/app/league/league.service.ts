import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { LeagueResponse } from './league.model';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class LeagueService {
  baseUrl = environment.leagueServiceBaseUrl;

  private league: LeagueResponse;

  constructor(private http: HttpClient) {}

  setLeague(league: LeagueResponse): void {
    this.league = league;
  }

  getLeague(): LeagueResponse {
    return this.league;
  }

  getLeagueById(leagueId: number): Observable<LeagueResponse> {
    try {
      const req = this.http
        .get<LeagueResponse>(this.baseUrl + `/api/league/${leagueId}`)
        .pipe(
          map((league: LeagueResponse) => {
            return league;
          }),
          catchError((error) => {
            return throwError(error);
          }),
          tap((league) => {
            this.setLeague(league);
          })
        );

      return req;
    } catch (error) {
      return null;
    }
  }
}

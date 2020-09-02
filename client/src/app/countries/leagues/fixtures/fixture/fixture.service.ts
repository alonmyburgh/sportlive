import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { FixturesResponse } from '../../../country.model';

@Injectable()
export class FixtureService {
  baseUrl = environment.fixturesServiceBaseUrl;

  constructor(private http: HttpClient) {}

  updateFixtureById = (fixtureId: number): Observable<FixturesResponse> => {
    const params = new HttpParams().set('fixtureId', fixtureId.toString());

    return this.http
      .get<any>(this.baseUrl + '/api/fixtures', { params })
      .pipe(
        map((fixture: any) => {
          return {
            fixtureId: fixture.fixture_id,
            eventDate: fixture.event_date,
            eventTimestamp: fixture.event_timestamp,
            firstHalfStart: fixture.firstHalfStart,
            secondHalfStart: fixture.secondHalfStart,
            round: fixture.round,
            status: fixture.status,
            statusShort: fixture.statusShort,
            elapsed: fixture.elapsed,
            venue: fixture.venue,
            referee: fixture.referee,
            homeTeam: fixture.homeTeam,
            awayTeam: fixture.awayTeam,
            goalsHomeTeam: fixture.goalsHomeTeam,
            goalsAwayTeam: fixture.goalsAwayTeam,
            score: fixture.score,
          };
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  };
}

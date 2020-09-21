import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FixturesResponse } from '../countries/country.model';
import { MediaModel, PredictionsResponse, StandingsResponse } from './match.model';

@Injectable()
export class MatchService {
  baseUrl = environment.fixturesServiceBaseUrl;

  constructor(private http: HttpClient) {}

  private match: FixturesResponse;

  getMatch(fixtureId: number): Observable<FixturesResponse> {
    const params = new HttpParams().set('fixtureId', fixtureId.toString());

    return this.http
      .get<FixturesResponse>(this.baseUrl + '/api/fixtures', { params })
      .pipe(
        map((match: FixturesResponse) => {
          return match;
        }),
        catchError((error) => {
          return throwError(error);
        }),
        tap((match) => {
          this.match = match;
        })
      );
  }

  fetchMatch(): FixturesResponse {
    return this.match;
  }

  getStandings(leagueId: number, season: number): Observable<StandingsResponse> {
    const params = new HttpParams()
      .set('leagueId', leagueId.toString())
      .set('season', season.toString());

    return this.http
      .get<StandingsResponse>(this.baseUrl + '/api/standings', { params })
      .pipe(
        map((standings: StandingsResponse) => {
          return standings;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getPredictions(fixtureId: number): Observable<PredictionsResponse> {
    const params = new HttpParams()
      .set('fixtureId', fixtureId.toString());

    return this.http
      .get<PredictionsResponse>(this.baseUrl + '/api/predictions', { params })
      .pipe(
        map((predictions: PredictionsResponse) => {
          return predictions;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getTwitterMedia(query: string): Observable<MediaModel> {
    const params = new HttpParams()
      .set('query', query);

    return this.http
      .get<MediaModel>(this.baseUrl + '/api/media', { params })
      .pipe(
        map((media: MediaModel) => {
          return media;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}

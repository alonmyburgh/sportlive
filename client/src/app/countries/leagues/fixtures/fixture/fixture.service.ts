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
      .get<FixturesResponse>(this.baseUrl + '/api/fixtures', { params })
      .pipe(
        map((fixture: FixturesResponse) => {
          return fixture;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}

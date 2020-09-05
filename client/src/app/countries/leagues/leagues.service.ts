import { Injectable } from '@angular/core';
import { LeaguesByIdRequest, LeaguesResponse } from '../country.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class LeaguesService {
  leaguesByIdRequest: LeaguesByIdRequest = new LeaguesByIdRequest();
  leagueLoaded = new Subject<string>();
  baseUrl = environment.fixturesServiceBaseUrl;

  constructor(private http: HttpClient) {}

  setLeaguesByIdRequest(request: LeaguesByIdRequest): void {
    this.leaguesByIdRequest = request;
  }

  getLeaguesByIdRequest(): LeaguesByIdRequest {
    return this.leaguesByIdRequest;
  }

  setLeagueLoaded(countryCode: string): void {
    this.leagueLoaded.next(countryCode);
  }

  getLeaguesById = (req: LeaguesByIdRequest): Observable<LeaguesResponse[]> => {
    return this.http.post<LeaguesResponse[]>(
      this.baseUrl + '/api/fixtures',
      req
    );
  }
}

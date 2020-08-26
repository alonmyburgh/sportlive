import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {
  CountriesResponse,
  LeaguesByIdRequest,
  LeaguesResponse,
} from './country.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CountryService {
  countriesChanged = new Subject<CountriesResponse[]>();
  dateChanged = new Subject<Date>();
  baseUrl = environment.fixturesServiceBaseUrl;

  private countries: CountriesResponse[] = [];
  private date: Date = new Date();

  constructor(private http: HttpClient) {}

  setCountries(countries: CountriesResponse[]): void {
    this.countries = countries;
    this.countriesChanged.next(this.countries.slice());
  }

  getCountries(): CountriesResponse[] {
    return this.countries.slice();
  }

  setDate(date: Date): void {
    this.date = date;
    this.dateChanged.next(this.date);
  }

  getDate(): Date {
    return this.date;
  }

  getLeaguesById = (req: LeaguesByIdRequest): Observable<LeaguesResponse[]> => {
    return this.http.post<LeaguesResponse[]>(
      this.baseUrl + '/api/fixtures',
      req
    );
  }
}

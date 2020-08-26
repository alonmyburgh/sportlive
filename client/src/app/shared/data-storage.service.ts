import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Fixtures, CountriesResponse } from '../countries/country.model';
import { CountryService } from '../countries/country.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  baseUrl = environment.fixturesServiceBaseUrl;

  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {}

  fetchCountries(): Observable<CountriesResponse[]> {
    return this.http
      .post<CountriesResponse[]>(this.baseUrl + '/api/fixturesbydate', {
        date: this.countryService.getDate(),
      })
      .pipe(
        map((countries: CountriesResponse[]) => {
          return countries
            ? countries.map((country) => {
                return {
                  ...country,
                };
              })
            : [];
        }),
        tap((countries) => {
          this.countryService.setCountries(countries);
        })
      );
  }
}

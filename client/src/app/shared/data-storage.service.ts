import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CountriesResponse } from '../countries/country.model';
import { CountryService } from '../countries/country.service';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  baseUrl = environment.fixturesServiceBaseUrl;

  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {}

  fetchCountries(): Observable<CountriesResponse[]> {
    try {
      const req = this.http
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
          catchError((error) => {
            return throwError(error);
          }),
          tap((countries) => {
            this.countryService.setCountries(countries);
          })
        );

      return req;
    } catch (error) {
      return null;
    }
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CountriesResponse } from './country.model';

@Injectable()
export class CountryService {
  countriesChanged = new Subject<CountriesResponse[]>();
  dateChanged = new Subject<string>();
  errorChanged = new Subject<boolean>();

  private countries: CountriesResponse[] = [];
  private date = '';
  private err = false;

  constructor() {}

  setCountries(countries: CountriesResponse[]): void {
    this.countries = countries;
    this.countriesChanged.next(this.countries.slice());
  }

  getCountries(): CountriesResponse[] {
    return this.countries.slice();
  }

  setDate(date: string): void {
    this.date = date;
    this.dateChanged.next(this.date);
  }

  getDate(): string {
    return this.date;
  }

  setError(isError: boolean): void {
    this.err = isError;
    this.errorChanged.next(this.err);
  }

  getError(): boolean {
    return this.err;
  }
}

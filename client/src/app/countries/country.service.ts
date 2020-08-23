import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CountriesResponse } from './country.model';

@Injectable()
export class CountryService {
  countriesChanged = new Subject<CountriesResponse[]>();
  dateChanged = new Subject<Date>();

  private countries: CountriesResponse[] = [];
  private date: Date = new Date();

  constructor() {}

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
}

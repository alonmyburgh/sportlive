import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { CountriesResponse } from './country.model';
import { DataStorageService } from '../shared/data-storage.service';
import { CountryService } from './country.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesResolverService implements Resolve<CountriesResponse[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private countriesService: CountryService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CountriesResponse[]> | CountriesResponse[] {
    const countries = this.countriesService.getCountries();

    if (countries.length === 0) {
      return this.dataStorageService.fetchCountries();
    } else {
      return countries;
    }
  }
}

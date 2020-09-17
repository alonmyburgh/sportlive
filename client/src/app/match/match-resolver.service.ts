import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { MatchService } from './match.service';
import { Observable } from 'rxjs';
import { FixturesResponse } from '../countries/country.model';

@Injectable({ providedIn: 'root' })
export class MatchResolverService implements Resolve<FixturesResponse> {
  constructor(private matchService: MatchService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FixturesResponse> | FixturesResponse {
    const fixtureId: number = route.params.fixtureId;
    return this.matchService.getMatch(fixtureId);
  }
}

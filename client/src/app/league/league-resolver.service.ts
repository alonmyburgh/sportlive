import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { LeagueResponse } from './league.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LeagueService } from './league.service';

@Injectable({ providedIn: 'root' })
export class LeagueResolverService implements Resolve<LeagueResponse> {
  constructor(private leagueService: LeagueService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LeagueResponse> | LeagueResponse {
    return this.leagueService.getLeagueById(route.params.leagueId).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }
}

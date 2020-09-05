import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaguesResponse } from '../country.model';
import { LeaguesService } from './leagues.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit, OnDestroy {
  leagues: LeaguesResponse[];

  subscription = new Subscription();

  constructor(private leagueService: LeaguesService, private router: Router) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const req = this.leagueService.getLeaguesByIdRequest();
    this.subscription = this.leagueService
      .getLeaguesById(req)
      .subscribe((rsp) => {
        this.leagues = rsp;
        this.leagueService.setLeagueLoaded(req.countryCode);
      });
  }

  onLeagueClicked(leagueId: number): void {
    this.router.navigate([`/league/${leagueId}`]);
  }
}

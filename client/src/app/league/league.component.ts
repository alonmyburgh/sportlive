import { Component, OnInit } from '@angular/core';
import { LeagueResponse } from './league.model';
import { LeagueService } from './league.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
})
export class LeagueComponent implements OnInit {
  league: LeagueResponse;
  leagueDurationPercent: number;
  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.league = this.leagueService.getLeague();
    this.leagueDurationPercent = this.calculateLeagueProgress();
  }

  calculateLeagueProgress = (): number => {
    const currentSeason = this.league.seasons.filter((l) => {
      return l.current === true;
    });
    if (currentSeason.length > 0) {
      const cs = currentSeason[0];
      const start = new Date(cs.start);
      const end = new Date(cs.end);
      const now = new Date();
      const diff = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const currentDate = Math.abs(now.getTime() - start.getTime());
      const currentDateDays = Math.ceil(currentDate / (1000 * 60 * 60 * 24));

      return (currentDateDays / diffDays) * 100;
    }

    return 0;
  }
}

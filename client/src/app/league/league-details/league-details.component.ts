import { Component, OnInit } from '@angular/core';
import { LeagueResponse, Season } from '../league.model';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css'],
})
export class LeagueDetailsComponent implements OnInit {
  league: LeagueResponse;
  currentSeason: Season;
  leagueDurationPercent: number;
  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.league = this.leagueService.getLeague();
    this.leagueDurationPercent = this.calculateLeagueProgress();
  }

  calculateLeagueProgress = (): number => {
    if (this.league) {
      const cs = this.league.seasons.filter((l) => {
        return l.current === true;
      });
      if (cs.length > 0) {
        this.currentSeason = cs[0];
        const start = new Date(this.currentSeason.start);
        const end = new Date(this.currentSeason.end);
        const now = new Date();
        const diff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const currentDate = Math.abs(now.getTime() - start.getTime());
        const currentDateDays = Math.ceil(currentDate / (1000 * 60 * 60 * 24));

        return (currentDateDays / diffDays) * 100;
      }
    }

    return 0;
  }
}

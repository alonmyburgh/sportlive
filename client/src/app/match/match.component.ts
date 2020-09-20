import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FixturesResponse } from '../countries/country.model';
import { PredictionsResponse, StandingsResponse } from './match.model';
import { MatchService } from './match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  match: FixturesResponse;
  standings: StandingsResponse;
  predictions: PredictionsResponse;
  activeTab: string;
  numberOfTabs: number;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.numberOfTabs = 3;
    this.activeTab = 'details';
    this.match = this.matchService.fetchMatch();
    if (this.match.statistics && this.match.statistics.length > 0) {
      this.numberOfTabs++;
    }
    if (this.match.lineups && this.match.lineups.length > 0) {
      this.numberOfTabs++;
    }
    forkJoin([
      this.matchService
        .getStandings(this.match.league.id, this.match.league.season)
        .pipe(catchError((error) => of(error))),
      this.matchService
        .getPredictions(this.match.fixture.id)
        .pipe(catchError((error) => of(error))),
    ]).subscribe(([standings, predictions]) => {
      if (standings.ok === undefined) {
        this.standings = standings;
        if (this.standings && this.standings !== null) {
          this.numberOfTabs++;
        }
      }
      if (predictions.ok === undefined) {
        this.predictions = predictions;
      }
    });
  }
}

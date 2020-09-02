import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FixturesResponse } from '../../../country.model';
import { FixtureService } from './fixture.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css'],
})
export class FixtureComponent implements OnInit, OnDestroy {
  @Input() fixture: FixturesResponse;
  updateSubscription: Subscription;
  timerSubscription: Subscription;

  constructor(private fixtureService: FixtureService) {}

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    if (
      this.fixture.statusShort === '1H' ||
      this.fixture.statusShort === 'HT' ||
      this.fixture.statusShort === '2H' ||
      this.fixture.statusShort === 'ET' ||
      this.fixture.statusShort === 'P'
    ) {
      const source = interval(30000);
      this.timerSubscription = source.subscribe(
        (val) =>
          (this.updateSubscription = this.fixtureService
            .updateFixtureById(this.fixture.fixtureId)
            .subscribe((rsp) => {
              this.fixture.elapsed = rsp.elapsed;
              this.fixture.goalsHomeTeam = rsp.goalsHomeTeam;
              this.fixture.goalsAwayTeam = rsp.goalsAwayTeam;
            }))
      );
    }
  }

  isToday = (date: string) => {
    const today = new Date();
    const d = new Date(date);
    return today.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0);
  };
}

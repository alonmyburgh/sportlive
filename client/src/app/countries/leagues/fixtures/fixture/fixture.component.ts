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
      this.fixture.fixture.status.short === '1H' ||
      this.fixture.fixture.status.short === 'HT' ||
      this.fixture.fixture.status.short === '2H' ||
      this.fixture.fixture.status.short === 'ET' ||
      this.fixture.fixture.status.short === 'P'
    ) {
      const source = interval(30000);
      this.timerSubscription = source.subscribe(
        (val) =>
          (this.updateSubscription = this.fixtureService
            .updateFixtureById(this.fixture.fixture.id)
            .subscribe((rsp) => {
              this.fixture.fixture.status.elapsed = rsp.fixture.status.elapsed;
              this.fixture.goals.home = rsp.goals.home;
              this.fixture.goals.away = rsp.goals.away;
            }))
      );
    }
  }

  isToday = (date: Date) => {
    const today = new Date();
    const d = new Date(date);
    return today.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0);
  };
}

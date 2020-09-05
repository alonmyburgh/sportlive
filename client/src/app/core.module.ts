import { NgModule } from '@angular/core';

import { CountryService } from './countries/country.service';
import { LeaguesService } from './countries/leagues/leagues.service';
import { LeagueService } from './league/league.service';
import { FixtureService } from './countries/leagues/fixtures/fixture/fixture.service';

@NgModule({
  providers: [CountryService, LeaguesService, LeagueService, FixtureService],
})
export class CoreModule {}

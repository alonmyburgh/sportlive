import { NgModule } from '@angular/core';

import { CountryService } from './countries/country.service';
import { LeagueService } from './countries/leagues/league.service';
import { FixtureService } from './countries/leagues/fixtures/fixture/fixture.service';

@NgModule({
  providers: [CountryService, LeagueService, FixtureService],
})
export class CoreModule {}

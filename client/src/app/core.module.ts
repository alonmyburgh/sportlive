import { NgModule } from '@angular/core';

import { CountryService } from './countries/country.service';
import { LeagueService } from './countries/leagues/league.service';

@NgModule({
  providers: [CountryService, LeagueService],
})
export class CoreModule {}

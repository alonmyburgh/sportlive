import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';

import { CountriesComponent } from './countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeaguesComponent } from './leagues/leagues.component';
import { FixturesComponent } from './leagues/fixtures/fixtures.component';

@NgModule({
  declarations: [CountriesComponent, LeaguesComponent, FixturesComponent],
  imports: [
    RouterModule,
    CountriesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountriesModule {}

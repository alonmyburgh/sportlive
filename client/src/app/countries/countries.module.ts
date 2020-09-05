import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CountriesComponent } from './countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeaguesComponent } from './leagues/leagues.component';
import { FixturesComponent } from './leagues/fixtures/fixtures.component';
import { FixtureComponent } from './leagues/fixtures/fixture/fixture.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@NgModule({
  declarations: [CountriesComponent, LeaguesComponent, FixturesComponent, FixtureComponent, DatePickerComponent],
  imports: [
    RouterModule,
    CountriesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountriesModule {}

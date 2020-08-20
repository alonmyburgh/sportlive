import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CountriesComponent } from './countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CountriesComponent],
  imports: [RouterModule, CountriesRoutingModule, SharedModule],
})
export class CountriesModule {}

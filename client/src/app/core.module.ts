import { NgModule } from '@angular/core';

import { CountryService } from './countries/country.service';

@NgModule({
  providers: [CountryService],
})
export class CoreModule {}

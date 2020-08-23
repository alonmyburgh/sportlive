import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesResolverService } from './countries-resolver.service';
import { CountriesComponent } from './countries.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    resolve: [CountriesResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}

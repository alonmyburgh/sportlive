import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
  {
    path: 'league/:leagueId',
    loadChildren: () =>
      import('./league/league.module').then((m) => m.LeagueModule),
  },
  {
    path: 'match/:fixtureId',
    loadChildren: () =>
      import('./match/match.module').then((m) => m.MatchModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

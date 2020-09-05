import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeagueResolverService } from './league-resolver.service';
import { LeagueComponent } from './league.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent,
    resolve: [LeagueResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchResolverService } from './match-resolver.service';
import { MatchComponent } from './match.component';

const routes: Routes = [
  {
    path: '',
    component: MatchComponent,
    resolve: [MatchResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}

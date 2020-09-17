import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatchComponent } from './match.component';
import { MatchRoutingModule } from './match-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MatchComponent],
  imports: [
    RouterModule,
    MatchRoutingModule,
    SharedModule,
  ],
})
export class MatchModule {}
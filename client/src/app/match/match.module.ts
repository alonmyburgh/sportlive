import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxTweetModule } from "ngx-tweet";

import { MatchComponent } from './match.component';
import { MatchRoutingModule } from './match-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StandingsComponent } from './standings/standings.component';
import { MediaComponent } from './media/media.component';

@NgModule({
  declarations: [MatchComponent, StandingsComponent, MediaComponent],
  imports: [RouterModule, MatchRoutingModule, SharedModule, NgxTweetModule],
})
export class MatchModule {}

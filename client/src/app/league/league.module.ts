import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { LeagueComponent } from './league.component';
import { LeagueRoutingModule } from './league-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LeagueComponent],
  imports: [
    RouterModule,
    LeagueRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
})
export class LeagueModule {}

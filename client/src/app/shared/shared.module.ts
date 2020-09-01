import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatchTimePipe } from './pipes/match-time-pipe';
import { ScoreLinePipe } from './pipes/score-line-pipe';

@NgModule({
  declarations: [LoadingSpinnerComponent, MatchTimePipe, ScoreLinePipe],
  imports: [CommonModule],
  exports: [CommonModule, LoadingSpinnerComponent, MatchTimePipe, ScoreLinePipe],
  entryComponents: [],
})
export class SharedModule {}

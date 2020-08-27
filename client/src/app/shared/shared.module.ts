import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatchTimePipe } from './pipes/match-time-pipe';

@NgModule({
  declarations: [LoadingSpinnerComponent, MatchTimePipe],
  imports: [CommonModule],
  exports: [CommonModule, LoadingSpinnerComponent, MatchTimePipe],
  entryComponents: [],
})
export class SharedModule {}

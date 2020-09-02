import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'scoreline' })
export class ScoreLinePipe implements PipeTransform {
  // tslint:disable-next-line: typedef
  transform(score: any, scr: number) {
    // tslint:disable-next-line: no-bitwise
    const scoreStr: string = score.extratime || score.fulltime || score.halftime;
    if (scoreStr !== null) {
      return scr.toString();
    }

    return '';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'scoreline' })
export class ScoreLinePipe implements PipeTransform {
  // tslint:disable-next-line: typedef
  transform(score: any, isHomeTeam: boolean) {
    // tslint:disable-next-line: no-bitwise
    const scoreStr: string = score.extratime || score.fulltime || score.halftime;
    if (scoreStr !== null) {
      const str = scoreStr.split('-');
      if (isHomeTeam) {
        return str[0];
      } else {
        return str[1];
      }
    }

    return '';
  }
}

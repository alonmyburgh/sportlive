import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'scoreline' })
export class ScoreLinePipe implements PipeTransform {
  // tslint:disable-next-line: typedef
  transform(scr: number) {
    if (scr !== null) {
      return scr.toString();
    }

    return '';
  }
}

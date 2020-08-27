import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'matchtime' })
export class MatchTimePipe implements PipeTransform {
  // tslint:disable-next-line: typedef
   transform(elapsed: number, statusShort: string, eventDate: Date) {
     if (statusShort === '1H' || statusShort === '2H' || statusShort === 'ET') {
       return elapsed + '\'';
     }
     if (statusShort === 'NS') {
         return moment(eventDate).format('HH:mm');
     }
     return statusShort;
   }
}

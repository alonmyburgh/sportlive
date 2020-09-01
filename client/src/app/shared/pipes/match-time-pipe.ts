import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'matchtime' })
export class MatchTimePipe implements PipeTransform {
  // tslint:disable-next-line: typedef
   transform(elapsed: number, statusShort: string, eventDate: Date) {
     if (statusShort === '1H' || statusShort === '2H' || statusShort === 'ET') {
       return elapsed + '\'';
     }
     if (statusShort === 'PST') {
       return 'Postponed';
     }
     if (statusShort === 'CANC') {
      return 'Cancelled';
    }
     if (statusShort === 'NS') {
       if(this.isToday(eventDate)) {
        return '';
       } else {
        return moment(eventDate).format('HH:mm');
       }
     }
     return statusShort;
   }

   isToday = (date: Date) => {
    const today = moment(new Date());
    const d = moment(date);
    return today.format('YYYY-MM-DD') === d.format('YYYY-MM-DD');
  }
}

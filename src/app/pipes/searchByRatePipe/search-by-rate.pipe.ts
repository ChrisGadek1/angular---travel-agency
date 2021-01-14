import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/classes/trip';

@Pipe({
  name: 'searchByRate'
})
export class SearchByRatePipe implements PipeTransform {

  transform(trips: Trip[], minRate: number, maxRate: number): unknown {
    if(!trips){
      return [];
    }
    else if(minRate == undefined || String(minRate) == ""){
      if(maxRate == undefined || String(maxRate) == ""){
        return trips;
      }
      else{
        return trips.filter(trip => {
          return trip.averageRate <= maxRate - 1;
        })
      }
    }
    else{
      if(maxRate == undefined || String(maxRate) == ""){
        return trips.filter(trip => {
          return trip.averageRate >= minRate - 1;
        });
      }
      else{
        return trips.filter(trip => {
          return trip.averageRate >= minRate - 1 && trip.averageRate <= maxRate - 1;
        });
      }
    }
  }

}

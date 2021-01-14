import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/classes/trip';

@Pipe({
  name: 'searchByDate'
})
export class SearchByDatePipe implements PipeTransform {

  parseDate(date: string){
    let result = "";
    result += date.split(".")[2]+"-";
    result += date.split(".")[1]+"-";
    result += date.split(".")[0];
    return result;
  }

  transform(trips: Trip[], minDate: string, maxDate: string): unknown {
    if(!trips){
      return [];
    }
    
    else if(minDate == undefined || minDate == ""){
      if(maxDate == undefined || maxDate == ""){
        return trips;
      }
      else{
        return trips.filter(trip => {
          return new Date(this.parseDate(trip.endDate)).getTime() <= new Date(maxDate).getTime();
        })
      }
    }
    else{
      if(maxDate == undefined || maxDate == ""){
        return trips.filter(trip => {
          return new Date(this.parseDate(trip.beginDate)).getTime() >= new Date(minDate).getTime();
        });
      }
      else{
        return trips.filter(trip => {
          return new Date(this.parseDate(trip.endDate)).getTime() <= new Date(maxDate).getTime() &&
          new Date(this.parseDate(trip.beginDate)).getTime() >= new Date(minDate).getTime();
        });
      }
    }
  }

}

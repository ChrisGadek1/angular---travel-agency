import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/classes/trip';
import { User } from 'src/app/classes/user';

@Pipe({
  name: 'canSeeArchiwal',
  pure:false
})
export class CanSeeArchiwalPipe implements PipeTransform {

  parseDate(date: string){
    let result = "";
    result += date.split(".")[2]+"-";
    result += date.split(".")[1]+"-";
    result += date.split(".")[0];
    return result;
  }

  transform(trips: Trip[], user:User): unknown {
    if(user != undefined && user.permissions.canSeeArchiwal){
      return trips;
    }
    else{
      return trips.filter(trip => {
        let currentDate = new Date();
        let beginTripDate = new Date(this.parseDate(trip.beginDate));
        return beginTripDate > currentDate;
      })
    }
    return null;
  }

}

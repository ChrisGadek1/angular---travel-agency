import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/classes/trip';
import { User } from 'src/app/classes/user';

@Pipe({
  name: 'canSeeWithoutPlaces',
  pure: false
})
export class CanSeeWithoutPlacesPipe implements PipeTransform {

  transform(trips: Trip[], user: User): unknown {
    if(user != undefined && user.permissions.canSeeWithoutPlaces){
      return trips;
    }
    else{
      return trips.filter(trip => {
        let booked = user != undefined && user.bucket != undefined? user.bucket.find(x => {
          x.tripID == trip.id
        }) : null;
        return trip.currentFreePlaces != 0 || booked != null;
      })
    }
  }

}

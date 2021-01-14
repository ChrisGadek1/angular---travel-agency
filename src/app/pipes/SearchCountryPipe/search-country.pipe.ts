import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/classes/trip';

@Pipe({
  name: 'searchCountry',
  pure: false
})
export class SearchCountryPipe implements PipeTransform {

  arrayContains(array: string[], value: string){
    let filtered = array.filter(gotValue => {
      
      return value == gotValue;
      
    })
    return filtered.length > 0;
  }

  transform(trips: Trip[], listedCountries: string[]): Trip[] {
    if(!trips){
      return [];
    }
    else if(listedCountries.length == 0){
      return trips;
    }
    else return trips.filter(trip => {
      return this.arrayContains(listedCountries, trip.country);
    })
  }

}

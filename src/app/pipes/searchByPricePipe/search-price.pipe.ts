import { isPlatformBrowser } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/classes/trip';

@Pipe({
  name: 'searchPrice',
  pure: false
})
export class SearchPricePipe implements PipeTransform {
  transform(trips: Trip[], minPrice: number, maxPrice: number): Trip[] {
    if(!trips){
      return [];
    }
    
    else if(minPrice == undefined || String(minPrice) == ""){
      if(maxPrice == undefined || String(maxPrice) == ""){
        return trips;
      }
      else{
        return trips.filter(trip => {
          return trip.price <= maxPrice;
        })
      }
    }
    else{
      if(maxPrice == undefined || String(maxPrice) == ""){
        return trips.filter(trip => {
          return trip.price >= minPrice;
        });
      }
      else{
        return trips.filter(trip => {
          return trip.price >= minPrice && trip.price <= maxPrice;
        });
      }
    }
  }

}

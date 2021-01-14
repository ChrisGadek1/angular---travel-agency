import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../classes/trip';

@Injectable({
  providedIn: 'root'
})
export class AddToBasketService {

  private tripObjectsOBs = new Subject<any>();
  tripObjects$ = this.tripObjectsOBs.asObservable();
  
  setObject(object: any){
    this.tripObjectsOBs.next(object);
  }


  constructor() { }
  
}

import { Injectable, ViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';

@Injectable({
  providedIn: 'root'
})
export class TripFilterService {

  private indexEmitter = new Subject<any>();
  indexEmitter$ = this.indexEmitter.asObservable();

  private viewRefOBs = new Subject<any>();
  viewRef$ = this.viewRefOBs.asObservable();

  listOfFilteredCountries: string[] = [];
  private listOfFilteredCountriesOBs = new Subject<string[]>();
  listOfFilteredCounttries$ = this.listOfFilteredCountriesOBs.asObservable();

  minRate: number;
  private minRateOBs = new Subject<number>();
  minRate$ = this.minRateOBs.asObservable();

  maxRate: number;
  private maxRateOBs = new Subject<number>();
  maxRate$ = this.maxRateOBs.asObservable();

  minPrice: number;
  private minPriceObs = new Subject<number>();
  minPrice$ = this.minPriceObs.asObservable();
  
  maxPrice: number;
  private maxPriceObs = new Subject<number>();
  maxPrice$ = this.maxPriceObs.asObservable();

  minDate: string;
  private minDateObs = new Subject<string>();
  minDate$ = this.minDateObs.asObservable();

  maxDate: string;
  private maxDateObs = new Subject<string>();
  maxDate$ = this.maxDateObs.asObservable();

  setMinDate(value){
    this.minDateObs.next(value);
  }

  setMaxDate(value){

    this.maxDateObs.next(value);
  }

  setMaxPrice(value){
    this.maxPriceObs.next(value);
  }

  setMinPrice(value){
    this.minPriceObs.next(value);
  }

  setMinRate(value){
    this.minRateOBs.next(value);
  }

  setMaxRate(value){
    this.maxRateOBs.next(value);
  }

  viewRefsInstancesArray = []

  pushRefToArray(ref: ViewRef){
    this.viewRefsInstancesArray.push(ref);
  }

  deleteFromRefArray(index:number){
    for(let i = index+1; i < this.viewRefsInstancesArray.length; i++){
      this.viewRefsInstancesArray[i].instance.index = this.viewRefsInstancesArray[i].instance.index-1;
    }
    this.viewRefsInstancesArray.splice(index, 1);
    this.viewRefOBs.next(this.viewRefsInstancesArray);
  }



  trips;
  constructor(private addTripService: AddTripToServerService) {
    
  }

  addFilteredCountry(name: string){
    this.listOfFilteredCountries.push(name);
    this.listOfFilteredCountriesOBs.next(this.listOfFilteredCountries);
  }

  setFilteredCountry(name:string, index:number){
    this.listOfFilteredCountries[index] = name;
    this.listOfFilteredCountriesOBs.next(this.listOfFilteredCountries);
  }

  deleteFilteredCountry(index:number){
    this.listOfFilteredCountries.splice(index, 1);
    this.listOfFilteredCountriesOBs.next(this.listOfFilteredCountries);
  }

  clearFilteredCountries(){
    this.listOfFilteredCountries = [];
    this.listOfFilteredCountriesOBs.next(this.listOfFilteredCountries);
  }

  emitComponentDeleteSignal(index){
    this.indexEmitter.next(index);
  }

  getFilteredCountries(){
    return this.filteredCountries;
  }

  setFilteredPrice(){

  }

  
  private filteredCountries;
  private filteredCountriesOBs = new Subject<string[]>();
  filteredCountries$ = this.filteredCountriesOBs.asObservable();

  private filteredPrices;
  private filteredPricesOBs = new Subject<number[]>();
  filteredPrices$ = this.filteredPricesOBs.asObservable();

  private filteredDate;
  private filteredDateOBs = new Subject<string[]>();
  filteredDate$ = this.filteredDateOBs.asObservable();

  private filteredRate;
  private filteredRateOBs = new Subject<number[]>();
  filteredRate$ = this.filteredRateOBs.asObservable();
}

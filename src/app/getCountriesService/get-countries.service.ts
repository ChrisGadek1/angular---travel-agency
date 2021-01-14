import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCountriesService{

  fetchedCountriesOBs = new Subject<any[]>();
  fetchedCountries$ = this.fetchedCountriesOBs.asObservable();  
  private countryList: string[];
  countriesRef: Observable<any[]> = this.db.list("countries").valueChanges();

  getCountries(){
    return this.countryList;
  }

  constructor(private db: AngularFireDatabase) {
    this.countriesRef.subscribe((countries) => {
      this.fetchedCountriesOBs.next(countries);
      this.countryList = countries.map(x => x.name_pl);
    })
  }
  
}

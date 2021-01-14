import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Trip } from '../classes/trip';
import { Permision } from '../classes/permision';

@Injectable({
  providedIn: 'root'
})
export class AddTripToServerService {
  private trips = new Subject<Trip[]>();
  trips$ = this.trips.asObservable(); 
  private dataToSend: Trip[];

  tripsRef: Observable<any[]> = this.db.list('array').valueChanges();
  lastIdRef: Observable<any> = this.db.object('lastId').valueChanges();
  bucketRef: Observable<any[]> = this.db.list('bucket').valueChanges();
  permissionsRef: Observable<any[]> = this.db.list('permissions').valueChanges();
  ratingRef: Observable<any[]> = this.db.list('rating').valueChanges();

  private lastId;
  private permissionList: Permision[] = [];

  getPermisionsList(){
    return this.permissionList;
  }

  getDataToSend(){
    return this.dataToSend;
  }

  setDataToSend(trips){
    this.trips.next(trips);
  }

  manipulateTripData(data){
    let minIndex = 0;
      let maxIndex = 0;
      for(let i = 0; i < data.length; i++){
        if(data[i].price < data[minIndex].price) minIndex = i;
        if(data[i].price > data[maxIndex].price) maxIndex = i;
      }
      for(let i = 0; i < data.length; i++){
        data[i]["date"] = data[i].beginDate+" - "+data[i].endDate;
        if(i == maxIndex){
          data[i]["mostExpensive"] = true;
        }
        else data[i]["mostExpensive"] = false;
        if(i == minIndex) data[i]["cheapest"] = true;
        else data[i]["cheapest"] = false;
      }
      this.dataToSend = data;
      this.setDataToSend(data);
  }

  deleteTripFromServer(id){
    this.db.list("array").remove(id.toString());
  }
  
  parseDate(date: string){
    let result = "";
    result += date.split("-")[2]+".";
    result += date.split("-")[1]+".";
    result += date.split("-")[0];
    return result;
  }

  addTripToServer(data){
    data.averageRate = 1;
    data.currentFreePlaces = data.maxPeople;
    data.beginDate = this.parseDate(data.beginDate);
    data.endDate = this.parseDate(data.endDate);
    data.id = this.lastId + 1;
    this.dataToSend = [...this.dataToSend, data];
    this.db.list("array").set((this.lastId + 1).toString(), data);
    this.db.object("lastId").set(this.lastId + 1);
    this.manipulateTripData(this.dataToSend);
  }
  
  modifyTrip(trip:Trip){
    this.db.list("array").set(trip.id.toString(), trip);
  }

  constructor(private db: AngularFireDatabase) {
    this.tripsRef.subscribe((trips) => {
      this.manipulateTripData(trips);
    })
    this.lastIdRef.subscribe((lastID) => {
      this.lastId = lastID;
    })
    this.permissionsRef.subscribe((permissionList) => {
      this.permissionList = permissionList;
    })
  }
  
}

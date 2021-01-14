import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddToBasketService } from '../AddToBasketService/add-to-basket.service';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { AuthService } from '../authService/auth.service';
import { Trip } from '../classes/trip';
import { User } from '../classes/user';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './add-delete-participation-component.component.html',
  styleUrls: ['./add-delete-participation-component.component.css']
})
export class AddDeleteParticipationComponent implements   OnInit, AfterViewInit {

  auth: AuthService;
  constructor(private addToBasketService: AddToBasketService, private db: AngularFireDatabase, private addTripsToServerService: AddTripToServerService, private authService: AuthService) {
    this.auth = authService;
  }
  ngAfterViewInit(): void {
    this.setDisability();
  }
  
  users: User[];
  tripsInBucket: any[] = [];

  ngOnInit(): void {
    this.free = this.trip.maxPeople;
    this.updateFreePlacesNunmber();
    if(this.users != this.authService.users){
      this.users = this.authService.users;
      this.updateFreePlacesNunmber()
      if(this.authService.user != null) {
        this.tripsInBucket = this.users.find(x => x.uid == this.authService.user.uid).bucket;
        if(this.tripsInBucket == undefined) this.tripsInBucket = [];
        this.setClientNumber(this.tripsInBucket);
      }
    }
    this.authService.users$.subscribe((users: User[]) => {
      this.users = users;
      this.updateFreePlacesNunmber()
      if(this.authService.user != null) {
        this.tripsInBucket = users.find(x => x.uid == this.authService.user.uid).bucket;
        if(this.tripsInBucket == undefined) this.tripsInBucket = [];
        this.setClientNumber(this.tripsInBucket);
        this.setDisability();
      }
      
    });
    
  }
  
  updateFreePlacesNunmber(){
    if(this.users != undefined){
      this.free = this.trip.maxPeople;
      this.users.forEach(user => {
        if(user.bucket != undefined){
          user.bucket.forEach(tripInBucket => {
            if(tripInBucket.tripID == this.trip.id) this.free -= tripInBucket.number; 
          })
        }
      })
    }
    
  }

  setClientNumber(tripsInBucket){
    this.booked = 0;
    tripsInBucket.forEach(bucket => {
      if(bucket.tripID == this.trip.id) this.booked += bucket.number;
    })
    this.db.list("array").update(this.trip.id.toString(), {'currentFreePlaces':this.free})
  }

  setDisability(){
    if(this.trip != undefined && this.booked == 0 && this.decButton != null){
      this.decButton.nativeElement.disabled = true;
    }
    else if(this.decButton != null){
      this.decButton.nativeElement.disabled = false;
    }
    if(this.free != undefined && this.free == 0  && this.incButton != null){
      this.incButton.nativeElement.disabled = true;
    }
    else if(this.incButton != null){
      this.incButton.nativeElement.disabled = false;
    }
    if(this.free != undefined && this.free <= 3){
      this.quantityLabel.nativeElement.style.color = "red";
    }
  }

  @ViewChild('incButton') incButton: ElementRef<HTMLInputElement>;
  @ViewChild('decButton') decButton: ElementRef<HTMLInputElement>;
  @ViewChild('errorLabel') errorLabel: ElementRef<HTMLDivElement>;
  @ViewChild('quantityLabel') quantityLabel: ElementRef<HTMLDivElement>;

  @Input()
  trip: Trip;
  @Input()
  tripNumber:number;
  @Input()
  isCheapest: boolean;
  @Input()
  isMostExpensive: boolean;
  free:number;
  booked = 0;

  getTripObject(append: boolean){
    return{
        "trip": this.trip,
        "append":append
      }
  }

  increment(){
    this.free += 1;
    this.booked -= 1;
    if(this.free == this.trip.maxPeople){
      this.decButton.nativeElement.disabled = true;
      if(this.booked == 0)this.errorLabel.nativeElement.innerHTML = "zrezygnowano ze wszystkich miejsc";
    }
    else{
      if(this.booked != 0) this.errorLabel.nativeElement.innerHTML = "";
    }
    if(this.free > 3){
      this.quantityLabel.nativeElement.style.color = "black";
    }
    this.incButton.nativeElement.disabled = false;
    this.addToBasketService.setObject(this.getTripObject(false));
    let user = this.authService.users.find(x => x.uid == this.authService.user.uid);
    if(this.booked == 0){
      user.bucket = user.bucket.filter((value) => value.tripID != this.trip.id);
    }
    else{
      user.bucket = user.bucket.map(x => {
        if(x.tripID == this.trip.id){
          x.number -= 1;
        }
        return x;
      })
    }
    this.db.list("users").set(this.authService.user.uid, user);
  }

  decrement(){
    this.free -= 1;
    this.booked += 1;
    if(this.free == 0){
      this.incButton.nativeElement.disabled = true;
      this.errorLabel.nativeElement.innerHTML = "brak wolnych miejsc";
    }
    else{
      this.errorLabel.nativeElement.innerHTML = "";
    }
    if(this.free <= 3){
      this.quantityLabel.nativeElement.style.color = "red";
    }
    this.decButton.nativeElement.disabled = false;
    this.addToBasketService.setObject(this.getTripObject(true));
    let user = this.authService.users.find(x => x.uid == this.authService.user.uid);
    console.log(user.bucket);
    if(user.bucket == undefined) user.bucket = []
    if(user.bucket.find(x => x.tripID == this.trip.id) == undefined){
      user.bucket.push({
        tripID: this.trip.id,
        number: 0
      })
    }
    user.bucket = user.bucket.map(x => {
      if(x.tripID == this.trip.id){
        x.number += 1;
      }
      return x;
    })
    this.db.list("users").set(this.authService.user.uid, user);
  }
}

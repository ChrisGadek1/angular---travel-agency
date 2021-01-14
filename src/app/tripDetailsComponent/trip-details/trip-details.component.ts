import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Trip } from 'src/app/classes/trip';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authService/auth.service';
import { User } from 'src/app/classes/user';



@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {


  constructor(public router:Router, private db: AngularFireDatabase,private authService: AuthService) {
    this.tripsOBs.subscribe((trips: Trip[]) => {
      let tripID = this.router.url.split("trip/")[1];
      this.trip = trips.find(trip => {
        return trip.id.toString() == tripID
      });
      if(this.trip == undefined || tripID == undefined){
        this.router.navigate(['/']);
      }
    })
    authService.user$.subscribe((user) => {
      this.user = user;
    })
  }
  private tripsOBs: Observable<any[]> = this.db.list("array").valueChanges();

  ngOnInit(): void {
    
  }

  @Input()
  trip: Trip;


  user:firebase.default.User;
  @Output() eventDelete = new EventEmitter<string>();

  deleteTrip(){
    this.eventDelete.emit(this.trip.name);
  }
}


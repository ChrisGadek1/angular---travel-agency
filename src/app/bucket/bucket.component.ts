import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddToBasketService } from '../AddToBasketService/add-to-basket.service';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { AuthService } from '../authService/auth.service';
import { Trip } from '../classes/trip';
import { User } from '../classes/user';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit, AfterViewInit {

  @ViewChild("downIconBucket") icon: ElementRef<HTMLLIElement>;
  isRotated = false;
  
  totalSum = 0;
  buckets: any[] = [];
  trips: Trip[]

  constructor(private addToServerService: AddTripToServerService, private authService: AuthService) {
    this.buckets = this.authService.users.find(x => x.uid == this.authService.user.uid).bucket;
    this.authService.users$.subscribe((users: User[]) => {
      this.buckets = users.find(x => x.uid == this.authService.user.uid).bucket

    })
  }

  getTripById(id:string){
    return this.trips.find((trip) => trip.id.toString() == id);
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.trips = this.addToServerService.getDataToSend();
  }

}

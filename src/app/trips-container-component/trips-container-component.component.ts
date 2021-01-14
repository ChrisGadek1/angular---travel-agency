import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { Trip } from '../classes/trip';
import { TripFilterService } from '../TripFilterService/trip-filter.service';
import { SearchCountryPipe } from '../pipes/SearchCountryPipe/search-country.pipe';
import { AuthService } from '../authService/auth.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-trips-container',
  templateUrl: './trips-container-component.component.html',
  styleUrls: ['./trips-container-component.component.css']
})
export class TripsContainerComponent implements OnInit{
  //https://jsonblob.com/257e8a43-2f6e-11eb-9b25-e53b6918d6ba
  constructor(private cd: ChangeDetectorRef,
    private addTripsToServer: AddTripToServerService,
    private filterService: TripFilterService,
    private searchPipe: SearchCountryPipe,
    private authService: AuthService) {
      authService.users$.subscribe((users:User[]) => {
        if(authService.user != null) this.user = users.find(x => x.uid == authService.user.uid);
      })
      authService.user$.subscribe(user => {
        if(this.users != undefined && user != null) this.user = this.users.find( x => x.uid == user.uid);
      })
    }
  
  trips: Trip[];
  user: User;
  users: User[] = [];

  getTrips(){
    return this.trips;
  }

  listOfCountries: String [] = [];
  minRate: number;
  maxRate: number;
  minPrice: number;
  maxPrice: number;
  minDate: string;
  maxDate: string;

  parseDate(date: string){
    let result = "";
    result += date.split(".")[2]+"-";
    result += date.split(".")[1]+"-";
    result += date.split(".")[0];
    return result;
  }

  
  ngOnInit(): void {
    this.users = this.authService.users;
    if(this.users != undefined && this.authService.user != null) this.user = this.users.find( x => x.uid == this.authService.user.uid);
    this.addTripsToServer.trips$.subscribe((data: any) => {
      this.trips = [];
      for(let i = 0; i < data.length; i++){
        let trip: Trip = new Trip(
          data[i].name,
          data[i].price,
          data[i].describtion,
          data[i].maxPeople,
          data[i].country,
          data[i].beginDate,
          data[i].endDate,
          data[i].currency,
          data[i].currentFreePlaces,
          data[i].imgSRC,
          data[i].id,
          data[i].averageRate
        )
        this.trips.push(trip);
      }
    });
    this.filterService.listOfFilteredCounttries$.subscribe(filteredCountries => {
      this.listOfCountries = filteredCountries;
    })
    this.filterService.minPrice$.subscribe(minPrice => {
      this.minPrice = minPrice;
    })
    this.filterService.maxPrice$.subscribe(maxPrice => {
      this.maxPrice = maxPrice;
    })
    this.filterService.minDate$.subscribe(minDate => {
      this.minDate = minDate;
    })
    this.filterService.maxDate$.subscribe(maxDate => {
      this.maxDate = maxDate;
    })
    this.filterService.minRate$.subscribe(minRate => {
      this.minRate = minRate;
    })
    this.filterService.maxRate$.subscribe(maxRate => {
      this.maxRate = maxRate;
    })
    this.trips = this.addTripsToServer.getDataToSend();
  }

  deleteInfo(id){
    this.addTripsToServer.deleteTripFromServer(id);
  }
}

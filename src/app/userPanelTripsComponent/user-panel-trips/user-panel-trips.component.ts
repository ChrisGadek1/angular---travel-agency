import { Component, OnInit } from '@angular/core';
import { AddTripToServerService } from 'src/app/addTripsToServer/add-trip-to-server.service';
import { Trip } from 'src/app/classes/trip';
import { GetCountriesService } from 'src/app/getCountriesService/get-countries.service';

@Component({
  selector: 'app-user-panel-trips',
  templateUrl: './user-panel-trips.component.html',
  styleUrls: ['./user-panel-trips.component.css']
})
export class UserPanelTripsComponent implements OnInit {

  constructor(private addTripsToServerService: AddTripToServerService, private countryService: GetCountriesService) { }

  trips: Trip[];
  countries: string[]

  ngOnInit(): void {
    this.trips = this.addTripsToServerService.getDataToSend()
    this.addTripsToServerService.trips$.subscribe((trips:Trip[]) => {
      this.trips = trips;
    });

  
  }

}

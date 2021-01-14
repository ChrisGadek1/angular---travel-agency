import { Component } from '@angular/core';
import { AddToBasketService } from './AddToBasketService/add-to-basket.service';
import { AddTripToServerService } from './addTripsToServer/add-trip-to-server.service';
import { GetCountriesService } from './getCountriesService/get-countries.service';
import { TripFilterService } from './TripFilterService/trip-filter.service';
import { ValidateAddTripFormService } from './ValidateAddTripForm/validate-add-trip-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AddTripToServerService, TripFilterService, ValidateAddTripFormService, AddToBasketService,
  GetCountriesService]
})
export class AppComponent {
  title = 'project-trips';
}

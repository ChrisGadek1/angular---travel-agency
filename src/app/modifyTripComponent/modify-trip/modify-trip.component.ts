import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AddTripToServerService } from 'src/app/addTripsToServer/add-trip-to-server.service';
import { AuthService } from 'src/app/authService/auth.service';
import { Permision } from 'src/app/classes/permision';
import { Trip } from 'src/app/classes/trip';
import { User } from 'src/app/classes/user';
import { GetCountriesService } from 'src/app/getCountriesService/get-countries.service';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.css']
})
export class ModifyTripComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService,private countryService: GetCountriesService, private addTripToServerService: AddTripToServerService) {
    this.authService.users$.subscribe((users:User[]) => {
      this.permission = users.find(x => x.uid == this.authService.user.uid).permissions;
    })
  }
  ngAfterViewInit(): void {
    this.countries = this.countryService.getCountries();
    
  }

  @Input()
  trip:Trip

  permission:Permision;

  countries: string[]
  ngOnInit(): void {
    this.permission = this.authService.users.find(x => x.uid == this.authService.user.uid).permissions;
    this.countries = this.countryService.getCountries();
    this.countryService.fetchedCountries$.subscribe(countries => {
      this.countries = countries.map(x => x.name_pl);
    });


  }

  parseDateToAnsi(date: string){
    let result = "";
    result += date.split(".")[2]+"-";
    result += date.split(".")[1]+"-";
    result += date.split(".")[0];
    return result;
  }

  parseDataFromAnsi(date:string){
    let result = "";
    result += date.split("-")[2]+".";
    result += date.split("-")[1]+".";
    result += date.split("-")[0];
    return result;
  }

  delete(){
    let confirmation = confirm("czy na pewno chcesz usunąć?");
    if(confirmation){
      this.addTripToServerService.deleteTripFromServer(this.trip.id);      
    }
  }

  change(event: Event){
    
  }

  modify(){
    let confirmation = confirm("potwierdź modyfikację danych");
    if(confirmation){
      let trip = new Trip(
        this.nameInput.nativeElement.value,
        parseInt(this.priceInput.nativeElement.value),
        this.describtion.nativeElement.value,
        parseInt(this.maxPeopleInput.nativeElement.value),
        this.countryInput.nativeElement.value,
        this.parseDataFromAnsi(this.beginDateInput.nativeElement.value),
        this.parseDataFromAnsi(this.endDateInput.nativeElement.value),
        "PLN",
        this.trip.currentFreePlaces,
        this.imgURLInput.nativeElement.value,
        this.trip.id,
        this.trip.averageRate
      );
      this.addTripToServerService.modifyTrip(trip);
    }
  }

  @ViewChild('maxPeopleInput') maxPeopleInput: ElementRef<HTMLInputElement>;
  @ViewChild('countryInput') countryInput: ElementRef<HTMLSelectElement>;
  @ViewChild('describtion') describtion: ElementRef<HTMLInputElement>;
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('imgURLInput') imgURLInput: ElementRef<HTMLInputElement>;
  @ViewChild('beginDateInput') beginDateInput: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput: ElementRef<HTMLInputElement>;
  @ViewChild('priceInput') priceInput: ElementRef<HTMLInputElement>;
}

import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { GetCountriesService } from '../getCountriesService/get-countries.service';
import { TripFilterService } from '../TripFilterService/trip-filter.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit, AfterViewInit {

  @Input() index: number;
  @Input() countries: Array<string> = [];
  constructor(private getCountriesService: GetCountriesService , private tripFilterService: TripFilterService) {
    
  }
  ngAfterViewInit(): void {
    this.getCountriesService.fetchedCountries$.subscribe(countries => {
      this.countries = countries.map((country) => country.name_pl);
    })
    this.deleteButton.nativeElement.addEventListener("click", ()=>{
      this.delete(this.index)
    });
    this.countries = this.getCountriesService.getCountries();
  }

  delete(index){
    this.tripFilterService.emitComponentDeleteSignal(index);
  }

  @ViewChild('select') selected: ElementRef<HTMLSelectElement>;
  @ViewChild('deleteButton') deleteButton: ElementRef<HTMLInputElement>;

  onChange(name){
    let value = this.selected.nativeElement.value;
    this.tripFilterService.setFilteredCountry(value, this.index);
  }

  ngOnInit(): void {
    this.countries = this.getCountriesService.getCountries();
  }

}

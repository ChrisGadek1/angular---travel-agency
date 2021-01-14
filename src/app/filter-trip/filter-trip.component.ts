import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { AddComponent } from '../add-component';
import { AdDirective } from '../add-components.directive';
import { CountryListComponent } from '../country-list/country-list.component';
import { TripFilterService } from '../TripFilterService/trip-filter.service';
import { ValidateAddTripFormService } from '../ValidateAddTripForm/validate-add-trip-form.service';

@Component({
  selector: 'app-filter-trip',
  templateUrl: './filter-trip.component.html',
  styleUrls: ['./filter-trip.component.css']
})
export class FilterTripComponent implements AfterViewInit {

  @ViewChild('downIconFilter') iconFilter : ElementRef<HTMLElement>;

  @ViewChild("placeToAddCountryList", {read: ViewContainerRef}) addComponent: ViewContainerRef;

  selects = [0];
  isRotated = false;
  countries;
  prices: Array<number>;
  minPrice: number = 0;
  maxPrice: number = 0;
  minDate: string = "";
  maxDate: string = "";
  minDateAmericanFormat: string;
  maxDateAmericanFormat: string;
  dates: Array<string>;
  rates: Array<number>;
  minRate: number;
  maxRate: number;

  constructor(private validateService: ValidateAddTripFormService, private componentFactoryResolver: ComponentFactoryResolver, private filterService: TripFilterService, private tripFilter: TripFilterService,private cd: ChangeDetectorRef) {
    this.validateService.countries$.subscribe(countries => {
      this.countries = countries
    });
    
    
    this.filterService.indexEmitter$.subscribe(index => {
      this.removeComponent(index);
      this.tripFilter.deleteFromRefArray(index);
    })
    
  }

  parseDate(date: string){
    let result = "";
    result += date.split(".")[2]+"-";
    result += date.split(".")[1]+"-";
    result += date.split(".")[0];
    return result;
  }

  getMinimumRateHTML(){
    let minRate: any = (<HTMLInputElement>document.getElementById("rate-filter-minimum")).value
    this.tripFilter.setMinRate(minRate);
  }

  getMaximumRateHTML(){
    let maxRate: any = (<HTMLInputElement>document.getElementById("rate-filter-maximum")).value 
    this.tripFilter.setMaxRate(maxRate);
  }

  getMinimumPriceHTML(){
    let minPrice: any = (<HTMLInputElement>document.getElementById("price-filter-minimum")).value
    this.tripFilter.setMinPrice(minPrice);
  }

  getMaximumPriceHTML(){
    let maxPrice: any = (<HTMLInputElement>document.getElementById("price-filter-maximum")).value 
    this.tripFilter.setMaxPrice(maxPrice);
  }

  getMinimumDateHTML(){
    let minDate: any = (<HTMLInputElement>document.getElementById("begin-data-filter")).value 
    this.tripFilter.setMinDate(minDate);
  }

  getMaximumDateHTML(){
    let maxDate: any = (<HTMLInputElement>document.getElementById("end-data-filter")).value 
    this.tripFilter.setMaxDate(maxDate);

  }

  ngAfterViewInit(): void {
    this.iconFilter.nativeElement.addEventListener("click",() => {
      if(!this.isRotated){
        this.iconFilter.nativeElement.style.transform = "rotate(180deg)";
        this.isRotated = true;
        document.getElementById("filterTripForm").classList.remove("minSizeForm");
        document.getElementById("filterTripForm").classList.add("mainSizeForm");
      }
      else{
        this.iconFilter.nativeElement.style.transform = "rotate(0deg)";
        this.isRotated = false;
        document.getElementById("filterTripForm").classList.add("minSizeForm");
        document.getElementById("filterTripForm").classList.remove("mainSizeForm");
      }
    })
    let children = document.getElementById("filterTripForm").children;
    for(let i = 0; i < children.length; i++){
      let checkbox : HTMLInputElement = children[i].querySelector("input[type=checkbox]") as HTMLInputElement;
      checkbox.addEventListener("click", ()=>{
        if(!checkbox.checked) {
          children[i].querySelector(".filter-input").classList.add("disabled");
        }
        else {
          children[i].querySelector(".filter-input").classList.remove("disabled");
          
        }
      })
    }

    document.getElementById("add-country-button").addEventListener("click", ()=>{
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CountryListComponent);
      this.componentRefer = this.addComponent.createComponent<CountryListComponent>(componentFactory);
      if(this.componentRefer != undefined){
        this.componentRefer.instance.countries = this.filterService.getFilteredCountries();
        this.componentRefer.instance.index = this.componentIndex;
        this.filterService.pushRefToArray(this.componentRefer);
        this.componentIndex++;
      }
      
    });

  }

  ngOnDestroy() {
    if(this.componentRefer != undefined) this.componentRefer.destroy();    
  }
  componentRefer;
  componentIndex = 0;
  removeComponent(index){
    this.tripFilter.deleteFilteredCountry(index);
      this.addComponent.remove(index);
      this.componentIndex--;
  }

}

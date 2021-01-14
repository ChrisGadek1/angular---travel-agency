import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { GetCountriesService } from '../getCountriesService/get-countries.service';
import { ValidateAddTripFormService } from '../ValidateAddTripForm/validate-add-trip-form.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
  
})
export class AddTripComponent implements AfterViewInit, OnInit {
  //https://jsonblob.com/13858d68-30dc-11eb-83d3-f74da0679ee0
  isRotated = false;
  countries;
  addTripForm: FormGroup;

  constructor(private formBuilder : FormBuilder, private addTripServerService: AddTripToServerService, private validateService: ValidateAddTripFormService,private getCountriesService: GetCountriesService)  {
    
    this.countries = this.getCountriesService.getCountries();
    this.validateService.addTripForm$.subscribe(addTripForm => this.addTripForm = addTripForm);
    this.validateService.formErrors$.subscribe(formErrors => this.formErrors = formErrors);
    this.addTripForm = this.validateService.addTripForm;
  }
  ngOnInit(): void {
    this.countries = this.getCountriesService.getCountries();
    this.getCountriesService.fetchedCountries$.subscribe(countries => {
      this.countries = countries.map(x => x.name_pl);
      console.log(this.countries);
    });
  }


  ngAfterViewInit(): void {
    this.countries = this.getCountriesService.getCountries();
  }
  
  @ViewChild('downIcon') icon : ElementRef<HTMLElement>;
    
  formErrors = {
    name: '',
    describtion: '',
    country: '',
    beginDate: '',
    endDate: '',
    price: '',
    maxPeople: ''
  }

  submit(){
    this.addTripServerService.addTripToServer(this.addTripForm.getRawValue());
    alert("wycieczka została dodana pomyślnie");
    this.validateService.resetForm();
  }
  
}

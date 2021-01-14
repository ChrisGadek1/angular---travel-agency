import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateAddTripFormService {

  private countriesSub = new Subject<any>();
  countries$ = this.countriesSub.asObservable();

  private addTripFormSub = new Subject<FormGroup>();
  addTripForm$ = this.addTripFormSub.asObservable();

  private formErrorsSub = new Subject<any>();
  formErrors$ = this.formErrorsSub.asObservable();

  private countries;
  oKQuantity(min, max): ValidatorFn{
    return (control: AbstractControl) =>  {
      if ( control.value != null && (control.value < min || control.value > max)) {
        return {
          wrongQuantity: true
        }
      }
      return null;
    }
  }

  beginDateLowerThanEndDate(group: FormGroup){
    let beginDate = new Date(group.get('endDate').value);
    let endDate = new Date(group.get('beginDate').value);
    if(group.get('beginDate') && group.get('endDate') && beginDate.getTime() < endDate.getTime()){
      let errors = group.get('endDate').errors;
      if(errors == null) errors = {};
      errors["endBeforeBegin"] = true;
      group.get('endDate').setErrors(errors);
      return{
        endBeforeBegin: true
      }
    }
    else{
      return null;
    } 
  }

  beginLowerThanNow(control: AbstractControl){
    let beginDate = new Date(control.value);
    let now = new Date();
    if(control.value != "" && beginDate.getTime() < now.getTime()){
      return{
        beginNotBeforeNow: true
      }
    }
  }


  onControlValueChanged() {
    const form = this.addTripForm;
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field); 
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
    this.formErrorsSub.next(this.formErrors);
  }

  formErrors = {
    name: '',
    describtion: '',
    country: '',
    beginDate: '',
    endDate: '',
    price: '',
    maxPeople: ''
  }

  private validationMessages = {
    name: {
      required: 'Wpisz nazwę'
    },
    describtion: {
      required: 'Wpisz opis',
      minlength: 'Opis powinien zawierać przynajmniej 50 znaków',
      maxlength: 'Opis powinien zawierać maksymalnie 500 znaków'
    },
    country : {
      required: 'wybierz kraj',
    },
    price: {
      required: 'wybierz cenę',
      wrongQuantity : 'poprawna wartość mieści się w przedziale od 50 do 50 000'
    },
    beginDate: {
      required: 'wybierz datę',
      endBeforeBegin: 'data początku wycieczki musi być przed datą końca wycieczki',
      beginNotBeforeNow: 'data początku wycieczki nie może być wcześniejsza niż aktualna data'
    },
    endDate: {
      required: 'wybierz datę',
      endBeforeBegin: 'data początku wycieczki musi być przed datą końca wycieczki'
    },
    maxPeople: {
      wrongQuantity: 'poprawna wartość mieści się w przedziale od 10 do 500',
      required: 'wybierz ilość'
    }
  }

  addTripForm: FormGroup;

  resetForm(){
    this.addTripForm.reset();
  }

  initValidation(){
    this.addTripForm = this.formBuilder.group({
      name: ['', Validators.required],
      describtion: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      country: ['', Validators.required],
      beginDate: ['', [this.beginLowerThanNow,Validators.required]],
      endDate: ['', Validators.required],
      maxPeople: ['', [ Validators.required, this.oKQuantity(10, 500)]],
      price: ['',[Validators.required, this.oKQuantity(50,50000)]],
      imgSRC: ''
    },{validator: this.beginDateLowerThanEndDate});
    this.addTripForm.valueChanges.subscribe((value) => {
      this.onControlValueChanged();
    });
    this.addTripFormSub.next(this.addTripForm);
    this.onControlValueChanged();
  }

  constructor(private formBuilder : FormBuilder) {
    this.initValidation();
  }
}

import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateRegisterService {

  registerForm: FormGroup;

  private formErrorsSub = new Subject<any>();
  formErrors$ = this.formErrorsSub.asObservable();

  private registerFormSub = new Subject<FormGroup>();
  registerFormSub$ = this.registerFormSub.asObservable();
  
  constructor(private formBuilder: FormBuilder) {
    this.initValidation();
  }

  formErrors = {
    email: '',
    password: '',
    retypePassword: ''
  }

  private validationMessages = {
    email: {
      notValidEmail: 'Wprowadź poprawny adres e-mail',
      required: 'podaj email'
    },
    password : {
      wrongLength: 'hasło musi mieć od 8 do 30 znaków',
      required: 'podaj hasło'
    },
    retypePassword:{
      notTheSame: 'hasła muszą być takie same',
      required: 'powtórz hasło'
    }
  }

  passwordMustBeTheSame(group: FormGroup){
    if(group.get("password").value != "" && group.get("retypePassword").value != "" && group.get("password").value != group.get("retypePassword").value){
      let errors = group.get('retypePassword').errors;
      if(errors == null) errors = {};
      errors["notTheSame"] = true;
      group.get('retypePassword').setErrors(errors);
      return{
        notTheSame: true
      }
    }
    else return null;
  }


  validateEmail(control: AbstractControl) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(control.value != "" && !re.test(String(control.value).toLowerCase())){
      return{
        notValidEmail: true
      }
    }
    else return null;
  }

  passwordLength(control: AbstractControl){
    let value = control.value;
    if(value.length < 8 || value.length > 30){
      return{
        wrongLength: true
      }
    }
    else return null;
  }

  

  onControlValueChanged() {
    const form = this.registerForm;
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = validationMessages[key];
        }
      }
    }
    this.formErrorsSub.next(this.formErrors);
  }

  initValidation(){
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validateEmail]],
      password: ['', [Validators.required, this.passwordLength]],
      retypePassword: ['', Validators.required]
    },{validator: this.passwordMustBeTheSame});
    this.registerForm.valueChanges.subscribe((value) => {
      this.onControlValueChanged();
    });
    this.registerFormSub.next(this.registerForm);
    this.onControlValueChanged();
  }
}

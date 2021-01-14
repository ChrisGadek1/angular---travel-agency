import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/authService/auth.service';
import { ValidateRegisterService } from 'src/app/ValidateRegisterService/validate-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  formErrors = {
    email: '',
    password: '',
    retypePassword: ''
  }
  constructor(private validateRegisterService: ValidateRegisterService, private authService: AuthService) {
    this.validateRegisterService.registerFormSub$.subscribe(registerForm => this.registerForm = registerForm);
    this.validateRegisterService.formErrors$.subscribe(formErrors => {
      this.formErrors = formErrors
    });
    this.registerForm = this.validateRegisterService.registerForm;
  }

  ngOnInit(): void {

  }

  submit(){
    let email = (<HTMLInputElement> document.getElementById("email-input")).value;
    let password = (<HTMLInputElement> document.getElementById("password-input")).value;
    this.authService.signUp(email,password);
    
  }

}

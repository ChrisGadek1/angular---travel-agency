import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authService/auth.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {


  user: firebase.default.User;
  constructor(private authFirebase: AuthService, private router: Router) {
    this.authFirebase.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.user = this.authFirebase.user;
    if(this.user != null && this.user != undefined){
      this.authFirebase.signOut();
      this.router.navigate(['/']);
    }
    
  }

  submit(){
    let email = (<HTMLInputElement>document.getElementById("login-input")).value;
    let password = (<HTMLInputElement>document.getElementById("password-input")).value;
    this.authFirebase.signIn(email, password);
  }

}

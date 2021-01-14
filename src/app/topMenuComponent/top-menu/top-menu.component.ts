import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authService/auth.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, AfterViewInit {

  user: firebase.default.User;
  users:User[];
  userWithPermissions: User;
  constructor(private authFirebase: AuthService) {
    this.authFirebase.user$.subscribe((user) => {
      this.user = user;
      this.findUserWithPermission()
    });
    this.authFirebase.users$.subscribe((users) => {
       this.users = users;
       this.findUserWithPermission()
    })
  }

  findUserWithPermission(){
    if(this.user != null && this.users != null) {
      this.userWithPermissions = this.users.find(x => x.uid == this.user.uid);
    }  
  }

  ngAfterViewInit(): void {
    this.user = this.authFirebase.user;
  }

  ngOnInit(): void {
    this.user = this.authFirebase.user;
  }

  

}

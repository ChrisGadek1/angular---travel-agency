import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authService/auth.service';
import { Permision } from 'src/app/classes/permision';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.users$.subscribe((users:User[]) => {
      if(authService.user != null) this.permission = users.find(x => x.uid == authService.user.uid).permissions;
    })
    
  }

  permission: Permision;
  clicked: number = 0;

  ngOnInit(): void {
    if(this.authService.users != null) this.permission = this.authService.users.find(x => x.uid == this.authService.user.uid).permissions;
    document.getElementById("user-nav").children[0].classList.add("menu-element-cliked");
  }

  setPanel(index){
    document.getElementById("user-nav").children[index].classList.add("menu-element-cliked");
    document.getElementById("user-nav").children[this.clicked].classList.remove("menu-element-cliked");
    this.clicked = index;
  }

}

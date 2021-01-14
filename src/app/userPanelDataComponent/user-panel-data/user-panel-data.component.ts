import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authService/auth.service';

@Component({
  selector: 'app-user-panel-data',
  templateUrl: './user-panel-data.component.html',
  styleUrls: ['./user-panel-data.component.css']
})
export class UserPanelDataComponent implements OnInit {

  constructor(private authService: AuthService) { }

  email:string; 

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.email = user.email
    });
    if(this.authService.user != null) this.email = this.authService.user.email;
    
  }

}

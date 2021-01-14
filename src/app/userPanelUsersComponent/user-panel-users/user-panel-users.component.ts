import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authService/auth.service';
import { Permision } from 'src/app/classes/permision';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user-panel-users',
  templateUrl: './user-panel-users.component.html',
  styleUrls: ['./user-panel-users.component.css']
})
export class UserPanelUsersComponent implements OnInit, AfterViewInit {

  users: User[];
  permissions: Permision[];

  constructor(private authService: AuthService) {
    this.authService.users$.subscribe((users:User[]) => {
      this.users = users;
    })
    this.authService.permisions$.subscribe((permissions:Permision[]) => {
      this.permissions = permissions;
    })

  }
  ngAfterViewInit(): void {
    this.users = this.authService.users;
  }

  ngOnInit(): void {
    this.permissions = this.authService.permissions;
    this.users = this.authService.users;

  }

}

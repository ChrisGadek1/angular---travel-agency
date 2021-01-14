import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddTripToServerService } from 'src/app/addTripsToServer/add-trip-to-server.service';
import { AuthService } from 'src/app/authService/auth.service';
import { Permision } from 'src/app/classes/permision';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-modify-user-for-admin-component',
  templateUrl: './modify-user-for-admin-component.component.html',
  styleUrls: ['./modify-user-for-admin-component.component.css']
})



export class ModifyUserForAdminComponentComponent implements OnInit {

  permissions: Permision[]
  currentPermission: Permision;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    this.authService.permisions$.subscribe((permissions:Permision[]) => {
      this.permissions = permissions;
    })
  }

  @Input()
  user:User
  

  ngOnInit(): void {
    this.permissions = this.authService.permissions;
    this.currentPermission = this.permissions.find(x => x.name == this.user.permissions.name);
  }

  changePermissions(){
    let permissionName = (<HTMLSelectElement>document.getElementById('permissionsSelect'+this.user.permissions.name)).value;
    let permission = this.permissions.find(x => x.name == permissionName);
    this.currentPermission = permission;
  }

  confirm(){
    let newUser = this.user;
    newUser.permissions = this.currentPermission;
    this.db.list("users").set(this.user.uid, newUser).then(() => {
      alert("Zatwierdzono zmiany")
    }).catch((error) => {
      alert("Wystąpił błąd z połączeniem")
    });
    
  }

}

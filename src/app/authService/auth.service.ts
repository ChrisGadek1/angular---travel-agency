import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { User } from '../classes/user';
import firebase from 'firebase';
import { Permision } from '../classes/permision'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  private usersOBs = new Subject<User[]>();
  users$ = this.usersOBs.asObservable();
  users: User[];

  private userOBs = new Subject<firebase.User>();
  user$ = this.userOBs.asObservable();
  user: firebase.User = null;
  userData: Observable<firebase.User>; 

  private permissionsObs = new Subject<Permision[]>();
  permisions$ = this.permissionsObs.asObservable();
  permissions: Permision[];

  angularAuth: AngularFireAuth;
  
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase, private addTripService: AddTripToServerService) {
    this.userData = angularFireAuth.authState;
    this.angularAuth = angularFireAuth;
    this.userData.subscribe(result => {
      this.user = result;
      this.userOBs.next(result);
      if(result == null){
        this.signOut();
      }
    });
    db.list("users").valueChanges().subscribe((usersData:User[]) => {
      this.usersOBs.next(usersData);
      this.users = usersData;
    });

    this.addTripService.permissionsRef.subscribe((permissions: Permision[]) => {
      this.permissions = permissions;
      this.permissionsObs.next(permissions);
    })
  }

  signIn(email:string, password: string){
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(result => {
      this.userOBs.next(result.user);
      this.user = result.user;
      this.router.navigate(['/']);
    }).catch(error => {
      alert("błąd logowania!");
    });
  }

  signOut(){
    this.angularFireAuth.signOut().then(result => {
      this.user = null;
      this.userOBs.next(null);
    });
  }

  signUp(email:string, password:string){
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(result => {
      this.user = result.user;
      this.userOBs.next(this.user);
      console.log(this.addTripService.getPermisionsList());
      let permission = this.addTripService.getPermisionsList().find(x => x.name == "reader");
      console.log(permission);
      let user = new User(result.user.uid, permission,[],this.user.email);
      this.db.list("users").set(this.user.uid, user);
      alert("rejestracja przebiegła pomyślnie!");
      this.router.navigate(['/login']);
    }).catch((error) => {
      alert("wystąpił błąd!");
    });
  }


}

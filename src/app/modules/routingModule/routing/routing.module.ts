import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddTripComponent } from 'src/app/add-trip/add-trip.component';
import { TripsContainerComponent } from 'src/app/trips-container-component/trips-container-component.component';
import { BucketComponent } from 'src/app/bucket/bucket.component';
import { TripDetailsComponent } from 'src/app/tripDetailsComponent/trip-details/trip-details.component';
import { Error404Component } from 'src/app/error404Component/error404/error404.component';
import { MainLoginComponent } from 'src/app/login/MainLoginComponent/main-login/main-login.component';
import { RegisterComponent } from 'src/app/register/register/register.component';
import { MainUserComponent } from 'src/app/mainUserComponent/main-user/main-user.component';

const routes: Routes = [
  {path: "", component: TripsContainerComponent},
  {path: "addTrip", component: AddTripComponent},
  {path: "basket", component: BucketComponent},
  {path: "trip/:type", component: TripDetailsComponent},
  {path: "login", component: MainLoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "user", component: MainUserComponent},
  {path: "**", component: Error404Component}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }

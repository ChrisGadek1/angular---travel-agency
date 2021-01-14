import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { TripComponentComponent } from './trip-component/trip-component.component';
import { AddDeleteParticipationComponent } from './add-delete-participation-component/add-delete-participation-component.component';
import { RatingComponentComponent } from './rating-component/rating-component.component';
import { TripsContainerComponent } from './trips-container-component/trips-container-component.component';
import { NavBarContainerComponent } from './nav-bar-container/nav-bar-container.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { FilterTripComponent } from './filter-trip/filter-trip.component';
import { CountryListComponent } from './country-list/country-list.component';
import { AdDirective } from './add-components.directive';
import { BucketComponent } from './bucket/bucket.component';
import { SearchCountryPipe } from './pipes/SearchCountryPipe/search-country.pipe';
import { SearchPricePipe } from './pipes/searchByPricePipe/search-price.pipe';
import { SearchByDatePipe } from './pipes/searchByDatePipe/search-by-date.pipe';
import { SearchByRatePipe } from './pipes/searchByRatePipe/search-by-rate.pipe';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TopMenuComponent } from './topMenuComponent/top-menu/top-menu.component';
import { RoutingModule } from './modules/routingModule/routing/routing.module';
import { TripDetailsComponent } from './tripDetailsComponent/trip-details/trip-details.component';
import { Error404Component } from './error404Component/error404/error404.component';
import { MainLoginComponent } from './login/MainLoginComponent/main-login/main-login.component';
import { RegisterComponent } from './register/register/register.component';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { MainUserComponent } from './mainUserComponent/main-user/main-user.component';
import { UserPanelDataComponent } from './userPanelDataComponent/user-panel-data/user-panel-data.component'
import { UserPanelTripsComponent } from './userPanelTripsComponent/user-panel-trips/user-panel-trips.component';
import { UserPanelUsersComponent } from './userPanelUsersComponent/user-panel-users/user-panel-users.component';
import { ModifyTripComponent } from './modifyTripComponent/modify-trip/modify-trip.component';
import { ModifyUserForAdminComponentComponent } from './modifyUserForAdmin/modify-user-for-admin-component/modify-user-for-admin-component.component';
import { CanSeeArchiwalPipe } from './pipes/canSeeArchiwalPippe/can-see-archiwal.pipe';
import { CanSeeWithoutPlacesPipe } from './pipes/canSeeWithoutPlacesPipe/can-see-without-places.pipe'

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    TripComponentComponent,
    AddDeleteParticipationComponent,
    RatingComponentComponent,
    TripsContainerComponent,
    NavBarContainerComponent,
    AddTripComponent,
    FilterTripComponent,
    CountryListComponent,
    AdDirective,
    BucketComponent,
    SearchCountryPipe,
    SearchPricePipe,
    SearchByDatePipe,
    SearchByRatePipe,
    TopMenuComponent,
    TripDetailsComponent,
    Error404Component,
    MainLoginComponent,
    RegisterComponent,
    MainUserComponent,
    UserPanelDataComponent,
    UserPanelTripsComponent,
    UserPanelUsersComponent,
    ModifyTripComponent,
    ModifyUserForAdminComponentComponent,
    CanSeeArchiwalPipe,
    CanSeeWithoutPlacesPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [SearchCountryPipe, SearchPricePipe,SearchByDatePipe, SearchByRatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

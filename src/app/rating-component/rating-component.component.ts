import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddTripToServerService } from '../addTripsToServer/add-trip-to-server.service';
import { AuthService } from '../authService/auth.service';
import { Trip } from '../classes/trip';

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating-component.component.html',
  styleUrls: ['./rating-component.component.css']
})
export class RatingComponentComponent implements OnInit, AfterViewInit {
  hovered = [false,false,false,false,false,false,false,false,false,false];
  isChosen = true;
  constructor(private addTripsToServer: AddTripToServerService, private db: AngularFireDatabase, private authService: AuthService) {
    
  }

  average: number = 0;

  addListeners(){
    for(let i = 0; i < this.hovered.length; i++){
      this.starContainer.nativeElement.childNodes[i].addEventListener("mouseover", () =>{
        this.starMouseEnter(i);
      });
      this.starContainer.nativeElement.childNodes[i].addEventListener("mouseout", () => {
        this.starMouseLeave(i);
      });
      this.starContainer.nativeElement.children[i].classList.remove("color-gold");
      this.starContainer.nativeElement.children[i].classList.add("color-white");
    }
  }
  currentIndex;
  ngAfterViewInit(): void {
    this.addTripsToServer.ratingRef.subscribe(rating => {
      if(this.text != "twoja ocena"){
        let tripRatings = rating.filter(value => value.tripID == this.trip.id);
        let average = 0;
        tripRatings.map(x => average += x.rate);
        if(tripRatings.length > 0) average = Math.round(average/tripRatings.length);
        else average = 0
        this.average = average;
        this.starMouseEnter(average);
      }
      
    })
     for(let i = 0; i < this.hovered.length; i++){
       if(this.text == "twoja ocena"){
          this.starContainer.nativeElement.childNodes[i].addEventListener("click", () => {
            this.choose();
          })
       }
       
     }
     this.starMouseEnter(this.average);
  }

  @Input()
  trip: Trip;
  @Input()
  text: string;

  @ViewChild('starContainer') starContainer : ElementRef<HTMLDivElement>;

  starMouseEnter(index){
    this.currentIndex = index;
    for(let i = 9; i >= 0; i--){
      if(i > index) {
        this.starContainer.nativeElement.children[i].classList.remove("color-gold");
        this.starContainer.nativeElement.children[i].classList.add("color-white");
      }
      else{
        this.starContainer.nativeElement.children[i].classList.add("color-gold");
        this.starContainer.nativeElement.children[i].classList.remove("color-white");
      }
    }
  }

  starMouseLeave(index){
    for(let i = 0; i <= index; i++){
      this.starContainer.nativeElement.children[i].classList.remove("color-gold");
      this.starContainer.nativeElement.children[i].classList.add("color-white");
    }
  }

  choose(){
    if(!this.isChosen){
      for(let i = 0; i < this.hovered.length; i++){
        let oldElement = this.starContainer.nativeElement.children[i];
        let newElement = oldElement.cloneNode(true);
        newElement.addEventListener("click", () => {
          this.choose();
        })
        oldElement.parentNode.replaceChild(newElement, oldElement);
      }
      this.isChosen = true;
      this.db.list("rating").set(this.authService.user.uid+"___"+this.trip.id,{
        rate: this.currentIndex,
        tripID: this.trip.id,
        uid: this.authService.user.uid,
        key: this.authService.user.uid+"___"+this.trip.id
      })
    }
    else{
      this.addListeners();
      this.isChosen = false;
      this.db.list("rating").remove(this.authService.user.uid+"___"+this.trip.id);
    }

  }

  ngOnInit(): void {
    
  }

}

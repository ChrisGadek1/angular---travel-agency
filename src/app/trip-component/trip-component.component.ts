import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Trip } from '../classes/trip';

@Component({
  selector: 'app-trip-component',
  templateUrl: './trip-component.component.html',
  styleUrls: ['./trip-component.component.css']
})
export class TripComponentComponent implements OnInit {


  constructor() { }
  
  ngOnInit(): void {
  }

  @Input()
  trip: Trip;
  @Input()
  isCheapest: boolean;
  @Input()
  isMostExpensive: boolean;
  @Input()
  rate: number;

  @Output() eventDelete = new EventEmitter<number>();

  deleteTrip(){
    this.eventDelete.emit(this.trip.id);
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {

  days = [0,1,2,3,4]
  daysString = ["MON","TUE","WEN","THU","FRI"]
  selectedDayIndex = 0
  currentDay = 0

  constructor(private router : Router) {

  }

  @Output() emitter : EventEmitter<number> = new EventEmitter()

 
  changeDay(day : number){
    this.currentDay = day
    console.log(`Emitting changed day from top nav`)
    this.emitter.emit(day)
  }

  ngOnInit() { 
   
  }

}

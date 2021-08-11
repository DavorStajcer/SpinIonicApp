import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Day } from 'src/app/interfaces/day';




@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

/*   isMondayChosen = true;
  isTusedayChosen = false;
  isWensdayChosen = false;
  isThursdayChosen = false;
  isFridayChosen = false;

  days: Map<HTMLElement, Day> = new Map() */

  days = [0,1,2,3,4]
  daysString = ["MON","TUE","WEN","THU","FRI"]
  selectedDayIndex = 0
  currentDay = 1

  constructor(private router : Router) {

  }

 
  changeDay(day : number){
    this.currentDay = day
  }

  ngOnInit() { 
   
  }


}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

enum Day {
  Monday,
  Tuesday,
  Wensday,
  Thursday,
  Friday
}


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  isMondayChosen = true;
  isTusedayChosen = false;
  isWensdayChosen = false;
  isThursdayChosen = false;
  isFridayChosen = false;

  days: Map<HTMLElement, Day> = new Map()

  constructor() {
    let monday = document.getElementById('monday')
    let tuesday = document.getElementById('tuesday')
    let wensday = document.getElementById('wensday')
    let thursday = document.getElementById('thursday')
    let friday = document.getElementById('friday')
    this.days.set(monday, Day.Monday)
    this.days.set(tuesday, Day.Tuesday)
    this.days.set(wensday, Day.Wensday)
    this.days.set(thursday, Day.Thursday)
    this.days.set(friday, Day.Friday)
    console.log(this.days)
  }

  @Output() dayChosenEmitter: EventEmitter<Day> = new EventEmitter<Day>();

  ngOnInit() { }

  private changeDaysLook(dayChosen: Day) {
    this.days.forEach((value: Day, key: HTMLElement) => {
      if (value == dayChosen) {
        key.classList.add('pressed');
        key.classList.remove('notPressed');
        this.dayChosenEmitter.emit(Day.Monday)
      } else {
        key.classList.add('notPressed');
        key.classList.remove('pressed');
      }
    });
  }

  onMondayChosen() {
    this.changeDaysLook(Day.Monday)
  }
  onTusedayChosen() {
    this.changeDaysLook(Day.Tuesday)
  }

}

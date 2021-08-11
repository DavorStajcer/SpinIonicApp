import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  polje = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 12, 2, 2, 2, 2, ]
  poljeOne = [1, 2, 3, 4, 5, 6, 7 ]

  constructor() { }

  ngOnInit() {
  }

  onDayChanged(day : number){
    console.log(`Day clicked -> ${day.toString()}`)
  }

}

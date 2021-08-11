import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  polje = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 12, 2, 2, 2, 2, ]
  poljeOne = [1, 2, 3, 4, 5, 6, 7 ]

  menus : Array<Menu> = []

  constructor(private restaurantService : RestourantService) { 
    this.restaurantService.menus.subscribe((menus : Array<Menu>)=> {
      this.menus = menus
    })
  }

  ngOnInit() {
  }

  onDayChanged(day : number){
    console.log(`Day got in menu -> ${day.toString()}`)
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish';
import { Menu } from 'src/app/interfaces/menu';
import { Order } from 'src/app/interfaces/order';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { OrderFilter } from 'src/app/util/orderFilter';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public dishesInMenu: Dish[] = []
  public dishesNotInMenu: Dish[] = []

  private menuDishesSubscription : Subscription
  private notMenuDishesSubscription : Subscription
  
  constructor(
    private restaurantService: RestourantService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.observeDishes()
    this.observeMenus()

  }

  private observeMenus() {
    this.restaurantService.menus.subscribe((menus: Array<Menu>) => {
      this.restaurantService.onMenuChanged()
    })
  }

  observeDishes(){
    this.notMenuDishesSubscription = this.restaurantService.dayDishesNotInMenu.get(this.restaurantService.currentDay).subscribe((dishes : Array<Dish>)=> {
      this.dishesNotInMenu = dishes
    })
    this.menuDishesSubscription = this.restaurantService.dayDishesInMenu.get(this.restaurantService.currentDay).subscribe((dishes : Array<Dish>)=> {
      this.dishesInMenu = dishes
    })
  }



  onDishClicked(clickedDish: Dish) {
   this.restaurantService.onDishClicked(clickedDish)

  }

  onDishFromMenuClicked(clickedDish: Dish) {
    this.restaurantService.onDishFromMenuClicked(clickedDish)
  }

  onDayChanged(day: number) {
    this.restaurantService.onDayChanged(day)
    this.menuDishesSubscription.unsubscribe()
    this.notMenuDishesSubscription.unsubscribe()
    this.observeDishes()
  }

  onAddNewDishButtonClicked() {
    this.router.navigate(["/web/newDish"])
  }

}

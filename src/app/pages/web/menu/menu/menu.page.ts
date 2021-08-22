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

  public allDishesInMenu: Dish[] = []
  public dishesNotInMenu: Dish[] = []

  public filteredDishesInMenu : Dish[] = []
  public searchTerm : string

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
      this.allDishesInMenu = dishes
      this.filteredDishesInMenu = OrderFilter.filterDishForSearchTerm(this.allDishesInMenu,this.searchTerm)
    })
  }

  searchEventFired(search : any){
    console.log(search)
    let searchTerm = search.target.value
    console.log(searchTerm)
    this.searchTerm = searchTerm
    this.filteredDishesInMenu = OrderFilter.filterDishForSearchTerm(this.allDishesInMenu,this.searchTerm)
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

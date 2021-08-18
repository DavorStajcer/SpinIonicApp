import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/interfaces/dish';
import { MobileMenu } from 'src/app/interfaces/mobileMenu';
import { Order } from 'src/app/interfaces/order';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { OrderFilter } from 'src/app/util/orderFilter';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  private restaurant : Restaurant

  /* private daysStringCro = ["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]
  private fetchedOrders : Array<Order> = []
  currentlyDisplayedOrders : Array<Order> = [] */
  public mobileMenus : Array<MobileMenu>

  constructor(
    private route : ActivatedRoute,
    private restaurantService : RestourantService
  ) {
    
   }

  ngOnInit() {
    this.fetchRestaurantId()
  }

  fetchRestaurantId(){
    this.route.queryParams.subscribe((queryParams)=>{
      console.log(queryParams)
      this.restaurantService.restaurants.value.forEach((restaurant)=> {
          if(restaurant.companyId == queryParams.id)
            this.restaurant = restaurant
      })
      console.log(this.restaurant)
      this.restaurantService.currentDay = 1
      this.mobileMenus = this.restaurant.menus[this.restaurantService.currentDay]
    })
  }

  onMobileMealClicked(clickedMobileMenu : MobileMenu){
    console.log("Mobile menu clicked in restaurant page !")
    this.mobileMenus.forEach((mobileMenu)=>{
      if(mobileMenu.dishId == clickedMobileMenu.dishId && mobileMenu.name == clickedMobileMenu.name)
        mobileMenu.inCart = true
    })
    this.restaurantService.onMobileMenuClicked(clickedMobileMenu)
  }

  onDayChanged(day : number){
    this.restaurantService.currentDay = day
    this.mobileMenus = this.restaurant.menus[day]
  }
}

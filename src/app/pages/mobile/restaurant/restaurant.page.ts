import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/interfaces/dish';
import { MobileMenu } from 'src/app/interfaces/mobileMenu';
import { Order } from 'src/app/interfaces/order';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { OrderFilter } from 'src/app/util/orderFilter';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  private restaurant : Restaurant
  private daysStringCro = ["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]
  /* private daysStringCro = ["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]
  private fetchedOrders : Array<Order> = []
  currentlyDisplayedOrders : Array<Order> = [] */
  public mobileMenus : Array<MobileMenu>

  constructor(
    private route : ActivatedRoute,
    private restaurantService : RestourantService,
    private cartService : CartService,
    private router : Router,
  ) {
    
   }

   public orders : Array<MobileMenu>

  ngOnInit() {
    this.fetchRestaurantId()
    this.subscribeToOrders()
  }

  fetchRestaurantId(){
    this.route.queryParams.subscribe((queryParams)=>{
      console.log(queryParams)
      this.restaurantService.restaurants.value.forEach((restaurant)=> {
          if(restaurant.companyId == queryParams.id)
            this.restaurant = restaurant
      })
      console.log(this.restaurant)
      this.restaurantService.currentDay = 0
      this.orders = this.cartService.orders.value
      this.cartService.orders.subscribe((orders)=>{
        this.orders = orders
      })
      this.mobileMenus = this.restaurant.menus[this.restaurantService.currentDay]
      this.setIsInCartProperty()
    })
  }

  setIsInCartProperty(){
      this.mobileMenus.forEach((mobileMenu)=> {
        mobileMenu.inCart = !!this.cartService.orders.value.find((order)=> order.day == this.restaurantService.currentDay)
      })
  }

  subscribeToOrders(){
 
  }

  onMobileMealClicked(clickedMobileMenu : MobileMenu){
    console.log("Mobile menu clicked in restaurant page !")
    this.mobileMenus.forEach((mobileMenu)=>{
      if(mobileMenu.dishId == clickedMobileMenu.dishId && mobileMenu.name == clickedMobileMenu.name)
        mobileMenu.inCart = true
    })
    let didPutInCart = this.cartService.modifyCart(clickedMobileMenu)
    console.log(`Did put in cart -> ${didPutInCart}`)
   // this.restaurantService.onMobileMenuClicked(clickedMobileMenu)
  }

  onDayChanged(day : number){
    this.restaurantService.currentDay = day
    this.mobileMenus = this.restaurant.menus[day]
  }

  async onShoppingFavButtonClicked(){
    console.log("FAV BUTTON CLICKED")
    await this.router.navigate(['/cart'])
  }
}

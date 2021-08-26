import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { Dish } from 'src/app/interfaces/dish';
import { MobileDish } from 'src/app/interfaces/mobileMenu';
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
export class RestaurantPage implements OnInit,ViewDidEnter {




  private restaurant: Restaurant
  public dishesForCurrentDay: Array<MobileDish> = []
  public dishesInCart: Array<MobileDish> = []
  public dishesInCartCount = 0

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestourantService,
    private cartService: CartService,
    private router: Router,
  ) {

  }

  ionViewDidEnter(): void {
    console.log("ionViewDidEnter")
    this.setRestourant()
    this.subscribeToAllDishesInCart()
    this.onDayChanged()
  }


  ngOnInit() {
   console.log("RESTAURANT INIT")
   this.setRestourant()
   this.subscribeToAllDishesInCart()
   this.onDayChanged()
  }


  private setRestourant() {
    this.route.queryParams.subscribe((queryParams) => {
      this.restaurantService.restaurants.value.forEach((restaurant) => {
        if (restaurant.companyId == queryParams.id)
          this.restaurant = restaurant
      })
    })
 
  }

  private subscribeToAllDishesInCart() {
    this.cartService.dishesInCart.subscribe((dishes) => {
      this.dishesInCart = dishes || []
      this.dishesInCartCount = this.dishesInCart.length
      this.setIsInCartProperty()
      console.log(`Got all dishes in cart˙-> ${this.dishesInCart?.length || -1}`)
    })
  }


  setIsInCartProperty() {
    this.dishesForCurrentDay.forEach((dish) => {
      dish.inCart = !!this.cartService.dishesInCart.value?.find((dishInCart) => dishInCart.day == this.restaurantService.currentDay + 1 && dishInCart.dishId == dish.dishId) 
    })
  }

  onMobileMealClicked(clickedMobileMenu: MobileDish) {
    console.log("Mobile menu clicked in restaurant page !")
    this.dishesForCurrentDay.forEach((mobileMenu) => {
      if (mobileMenu.dishId == clickedMobileMenu.dishId && mobileMenu.name == clickedMobileMenu.name)
        mobileMenu.inCart = true
    })
    let didPutInCart = this.cartService.modifyCart(clickedMobileMenu)
    console.log(`Did put in cart -> ${didPutInCart}`)
    clickedMobileMenu.inCart = didPutInCart
    //this.restaurantService.onMobileMenuClicked(clickedMobileMenu)
  }

  onDayChanged(day?: number) {
    if(this.restaurant == undefined ||this.restaurant == null)
      return
    this.restaurantService.currentDay = day || 0
    this.dishesForCurrentDay = this.restaurant.menus[this.restaurantService.currentDay]
    this.setIsInCartProperty()
  }

  async onShoppingFavButtonClicked() {
    console.log("FAV BUTTON CLICKED")
    await this.router.navigate(['/cart'])
  }
}

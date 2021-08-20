import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MobileDish } from 'src/app/interfaces/mobileMenu';
import { Order } from 'src/app/interfaces/order';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  public dishesInCart: BehaviorSubject<Array<MobileDish>> = new BehaviorSubject([])

  constructor(
    private userService: UserService,
    private storage: StorageService,
    private httpClient : HttpClient
  ) { 
    
  }


  async initCartDishesForUser(){
    console.log("INITING CART DISHES FOR USER")
    let userDishesInCart = await this.storage.getData(`${this.userService._currentUser.value.userId}` + 'cart')
    this.dishesInCart.next(userDishesInCart)
  }

  modifyCart(menuDish: MobileDish): boolean {
    let dishCopy: MobileDish = Object.assign({}, menuDish)
    let cartDishes = this.dishesInCart.value || []
    let index = cartDishes.findIndex((order) =>
      order.dishId == dishCopy.dishId && order.day == dishCopy.day
    ) 

    if (index === -1) {
      delete dishCopy.inCart
      cartDishes.push(dishCopy)
    } else {
      cartDishes.splice(index, 1)
    }
    this.dishesInCart.next(cartDishes)
    this.storage.setData(`${this.userService._currentUser.value.userId}` + 'cart', cartDishes)
    return index === -1
  }


  async finishOrder(){
    this.dishesInCart.value.forEach((dish)=>{
      this.addOrder(dish)
    })
    await this.storage.removeData(`${this.userService._currentUser.value.userId}` + 'cart')
    this.dishesInCart.next([])
  }

  private async addOrder(dish : MobileDish){
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrder",
          "params": {
            "userid": this.userService._currentUser.value.userId,
            "dishid": dish.dishId,
            "day": dish.day
          }
        }
      ]
    }

    this.httpClient.post(this.url,body).toPromise().then(async (response)=>{
      console.log(response)
    })
  }
}

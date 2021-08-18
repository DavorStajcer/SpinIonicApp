import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MobileMenu } from 'src/app/interfaces/mobileMenu';
import { Order } from 'src/app/interfaces/order';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  public orders: BehaviorSubject<Array<MobileMenu>> = new BehaviorSubject(null)

  constructor(
    private userService: UserService,
    private storage: StorageService,
    private httpClient : HttpClient
  ) { }

  modifyCart(menuDish: MobileMenu): boolean {
    let dishCopy: MobileMenu = Object.assign({}, menuDish)
    let orders = this.orders.value
    let index = orders.findIndex((order) =>
      order.dishId == dishCopy.dishId && order.day == dishCopy.day
    )

    if (index === -1) {
      delete dishCopy.inCart
      orders.push(dishCopy)
    } else {
      orders.splice(index, 1)
    }
    this.orders.next(orders)
    this.storage.setData(`${this.userService._currentUser.value.userId}` + 'cart', orders)
    return index === -1
  }


  async finishOrder(){
    const order = this.orders.value[0]
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrder",
          "params": {
            "userid": this.userService._currentUser.value.userId,
            "dishid": order.dishId,
            "day": order.day

          }
        }
      ]
    }

    await this.httpClient.post(this.url,body).toPromise().then(async (response)=>{
      await this.storage.removeData(`${this.userService._currentUser.value.userId}` + 'cart')
    })
    this.orders.next([])
  }
}

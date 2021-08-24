import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MobileOrder } from 'src/app/interfaces/mobileOrder';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { OrderFilter } from 'src/app/util/orderFilter';
import { RestourantService } from '../restourant/restourant.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"
  public userOrders = new BehaviorSubject<MobileOrder[]>(null)
  private currentUser: User

  constructor(
    private httpClient: HttpClient,
    private restaurantService: RestourantService
  ) { }


  async initUserOrders(user: User) {
    this.currentUser = user
    await this.fetchUserOrders()
  }

  private async fetchUserOrders() {
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forUser",
            "userid": this.currentUser.userId
            // "userid": 210
          }
        }
      ]
    }

    await this.httpClient.post(this.url, body).toPromise().then(async (response) => {
      let userOrders: any = response
      let promisesToResolve: Promise<any>[] = []
      userOrders.forEach(order => {
        let promise = this.restaurantService.mapImageToMobileOrder(order)
        promisesToResolve.push(promise)
      })
      await Promise.all(promisesToResolve)
      this.userOrders.next(response as MobileOrder[])
      console.log("User orders:")
      console.log(response)
    })
  }



  public async onOrdersPlaced(): Promise<void> {
    await this.fetchUserOrders()
  }


}

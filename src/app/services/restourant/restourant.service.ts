import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Order } from 'src/app/interfaces/order';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';



@Injectable({
  providedIn: 'root'
})
export class RestourantService {

  constructor(private httpClient: HttpClient,private userService : UserService) { }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"


  orders : BehaviorSubject<Array<Order>> = new BehaviorSubject(null)
  menus : BehaviorSubject<Array<Menu>> = new BehaviorSubject(null)




  initRestaurantForCompanyUser() {
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forCompany",
            "restoranid": this.userService.getUserCompany()
          },
          "tablename":"orders"
        },
        {
          "query": "spMenu",
          "params": {
              "action": "week",
              "companyid": this.userService.getUserCompany()
          },
          "tablename":"menus"
      }
      ]
    }

    return this.httpClient.post(this.url,body)
    .toPromise()
    .then((result : any) => {
      console.log(`Orders -> ${result}`)
      console.log(`Orders -> ${result.orders}`)
      this.orders.next(result.orders)
      this.menus.next(result.menus)
      return result.orders as Array<Order>
    })

    
  }

  private getRetaurantId(){

  }

  initRestaurantForCustomerUser() {
    return []

  }


 
}


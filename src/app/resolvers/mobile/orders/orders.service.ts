import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<Array<Order>> {

  constructor(
    private userService : UserService,
    private ordersService : OrdersService,
  ) { }


  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
     ): Promise<any> {
     if(!this.userService.isMobile)
      return
     return await this.ordersService.initUserOrders(this.userService._currentUser.value) 
  }
}

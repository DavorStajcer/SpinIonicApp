import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestourantResolverService implements Resolve<Array<Order>> {

  constructor(private userService : UserService, private restourantService : RestourantService) { }
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
     ): Promise<any> {
     if(!this.userService.isMobile)
        return await this.restourantService.initRestaurantForCompanyUser()
     else
        return await this.restourantService.initRestaurantForCustomerUser().toPromise()   
  }
}

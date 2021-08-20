import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MobileDish } from 'src/app/interfaces/mobileMenu';
import { CartService } from 'src/app/services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<void>{

  constructor(
    private cartService: CartService,
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    ): Promise<any> {
    return await this.cartService.initCartDishesForUser()
  }
 
}

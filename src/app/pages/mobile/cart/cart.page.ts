import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MobileDish } from 'src/app/interfaces/mobileMenu';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public dishesInCart: Array<MobileDish>

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private ordersService: OrdersService,
    private router: Router,
  ) {
    this.cartService.dishesInCart.subscribe((dish) => {
      if (dish == null || dish == undefined)
        this.dishesInCart = []
      else
        this.dishesInCart = dish.sort((a, b) => a.day - b.day)
    })
  }

  ngOnInit() {

  }

  onBackNavClicked() {
    console.log("Back nav clicked")
    this.router.navigate(["/mobile/tabs/restaurant"])
  }

  async finishOrder() { //Naruci sva jela u shopping cartu
    await this.cartService.finishOrder()
    await this.ordersService.onOrdersPlaced()
    await this.presentToast()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Order confirmed',
      duration: 2000,
      color: 'primary'
    })
    await toast.present()
  }

}

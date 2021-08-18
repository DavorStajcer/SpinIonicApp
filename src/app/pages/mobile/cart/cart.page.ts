import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MobileMenu } from 'src/app/interfaces/mobileMenu';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public orders : Array<MobileMenu>

  constructor(
    private cartService: CartService,
    private toastController : ToastController,
  ) { 
    this.cartService.orders.subscribe((orders) => {
      this.orders = orders.sort((a,b)=> a.day - b.day)
    })
  }

  ngOnInit() {
   
  }

  async finishOrder(){ //Naruci sva jela u shopping cartu
    await this.cartService.finishOrder()
    await this.presentToast()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message : 'Order confirmed',
      duration : 2000,
      color : 'primary'
    })
    await toast.present()
  }

}

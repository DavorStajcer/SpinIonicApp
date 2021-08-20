import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileOrder } from 'src/app/interfaces/mobileOrder';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {


  public userOrders : MobileOrder[] = []

  constructor(
    private ordersService : OrdersService,
    private router : Router
  ) { }

  ngOnInit() {
    this.subscribeToUserOrders()
  }


  private subscribeToUserOrders(){
    this.ordersService.userOrders.subscribe((orders)=>{
      this.userOrders = orders || []
      console.log("User orders in orders page :")
      console.log(this.userOrders)
    })
  }

  public onBackNavClicked(){
    this.router.navigate(["/mobile/tabs/profile"])
  }

}

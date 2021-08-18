import { Component, OnInit } from '@angular/core';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    private restourantService : RestourantService,
  ) { }

  ngOnInit() {
    this.restourantService.orders.subscribe((orders)=>{
      
    })
  }

}

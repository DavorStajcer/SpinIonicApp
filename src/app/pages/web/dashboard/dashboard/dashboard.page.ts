import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Day } from 'src/app/interfaces/day';
import { Order } from 'src/app/interfaces/order';
import { RestourantService } from 'src/app/services/restourant/restourant.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  fetchedOrders : Array<Order> = []

  constructor(private router : Router,private restaurantService : RestourantService) { 
    this.restaurantService.orders.subscribe((orders : Array<Order>) => {
        this.fetchedOrders = orders
    })
  }


  ngOnInit() {
    
  }

  onDayChanged(day : Day){
      console.log(`Day got in dashboard -> ${day}`)
  }

}

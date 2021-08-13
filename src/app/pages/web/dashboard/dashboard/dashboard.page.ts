import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Day } from 'src/app/interfaces/day';
import { Order } from 'src/app/interfaces/order';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { OrderFilter } from 'src/app/util/orderFilter';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private daysStringCro = ["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]
  private fetchedOrders : Array<Order> = []
  currentlyDisplayedOrders : Array<Order> = []
  private currentDay : number = 0

  constructor(private router : Router,private restaurantService : RestourantService) { 
    this.restaurantService.orders.subscribe((orders : Array<Order>) => {
        this.fetchedOrders = orders
        this.currentlyDisplayedOrders = OrderFilter.mapOrdersToDay(orders,this.daysStringCro[this.currentDay])
         this.currentlyDisplayedOrders.forEach((order)=>{
          console.log(order)
        }) 
        
    })
  }


  ngOnInit() {
    
  }

  onDayChanged(day : number){
    this.currentDay = day
    this.currentlyDisplayedOrders = OrderFilter.mapOrdersToDay(this.fetchedOrders,this.daysStringCro[this.currentDay])
    this.currentlyDisplayedOrders.forEach((order)=>{
      console.log(order)
    }) 
      console.log(`Day got in dashboard -> ${day}`)
  }

}

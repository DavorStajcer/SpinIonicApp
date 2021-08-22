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
  private ordersForCurrentDay : Array<Order> = []
  public filteredOrders : Array<Order> = []
  private currentDay : number = 0
  public searchTerm : string

  constructor(
    private router : Router,
    private restaurantService : RestourantService,
    ) { 
    this.restaurantService.orders.subscribe((orders : Array<Order>) => {
        this.fetchedOrders = orders
        this.ordersForCurrentDay = OrderFilter.mapOrdersToDay(orders,this.daysStringCro[this.currentDay])
        this.ordersForCurrentDay.forEach((order)=>{
          console.log(order)
        }) 
        this.filteredOrders = OrderFilter.filterOrdersForSearchTerm(this.ordersForCurrentDay,this.searchTerm)
    })
  }

  searchEventFired(search : any){
    console.log(search)
    let searchTerm = search.target.value
    console.log(searchTerm)
    this.searchTerm = searchTerm
    this.filteredOrders = OrderFilter.filterOrdersForSearchTerm(this.ordersForCurrentDay,this.searchTerm)
  }


  ngOnInit() {
    
  }

  onDayChanged(day : number){
    this.currentDay = day
    this.ordersForCurrentDay = OrderFilter.mapOrdersToDay(this.fetchedOrders,this.daysStringCro[this.currentDay])
    this.filteredOrders = OrderFilter.filterOrdersForSearchTerm(this.ordersForCurrentDay,this.searchTerm)
    this.ordersForCurrentDay.forEach((order)=>{
      console.log(order)
    }) 
      console.log(`Day got in dashboard -> ${day}`)
  }

}

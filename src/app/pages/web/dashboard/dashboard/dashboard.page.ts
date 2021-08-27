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
    private restaurantService : RestourantService,
    ) { 
      this.observeOrdersChange()
  }

  ngOnInit() {
    
  }

  private observeOrdersChange(){
    this.restaurantService.orders.subscribe((orders : Array<Order>) => {
      this.fetchedOrders = orders
      this.setOrders()
  })
  }

  searchEventFired(search : any){
    let searchTerm = search.target.value
    this.searchTerm = searchTerm
    this.filteredOrders = OrderFilter.filterOrdersForSearchTerm(this.ordersForCurrentDay,this.searchTerm)
  }


  onDayChanged(day : number){
    this.currentDay = day
    this.setOrders()
  }

  private setOrders(){
    this.ordersForCurrentDay = OrderFilter.mapOrdersToDay(this.fetchedOrders,this.daysStringCro[this.currentDay])
    this.filteredOrders = OrderFilter.filterOrdersForSearchTerm(this.ordersForCurrentDay,this.searchTerm)
  }

}

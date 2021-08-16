import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  private restaurant : Restaurant

  constructor(
    private route : ActivatedRoute,
    private restaurantService : RestourantService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams)=>{
      console.log(queryParams)
      this.restaurantService.restaurants.value.forEach((restaurant)=> {
          if(restaurant.companyId == queryParams.id)
            this.restaurant = restaurant
      })
      console.log(this.restaurant)
    })
  }

}

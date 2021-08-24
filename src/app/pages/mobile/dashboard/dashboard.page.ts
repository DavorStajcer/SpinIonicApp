import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  allRestaurants: Restaurant[]
  filteredRestaurants: Restaurant[]

  constructor(
    private restaurantService: RestourantService,
  ) {
    this.initializeDashboard()
  }

  onSearchTermChanged(event) {
    console.log(event)
    const searchTerm = event.target.value.toLowerCase()
    this.filteredRestaurants = this.allRestaurants.filter((restaurant) => {
      return (searchTerm != null && searchTerm != undefined) ? restaurant.name.toLowerCase().includes(searchTerm) : this.allRestaurants
    })
  }

  initializeDashboard() {
    this.restaurantService.restaurants.subscribe((restaurants) => {
      this.allRestaurants = restaurants
      this.setRandomImage()
      console.log(restaurants)
      this.filteredRestaurants = restaurants

    })
  }

  setRandomImage() {
    this.allRestaurants.forEach((restaurant) => {
      const random = Math.floor(Math.random() * 5) + 1
      //  restaurant.image = `url("assets/images/restoran${random}.jpg")`
      //  restaurant.image = `url("assets/images/restoran${random}.jpg")`
      restaurant.image = `assets/images/restoran${random}.jpg`
    })
  }

  ngOnInit() {
  }

  async onRestaurantClicked(companyId: number) {
    await this.restaurantService.onRestaurantClicked(companyId)
  }

}

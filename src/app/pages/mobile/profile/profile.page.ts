import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { Photo } from 'src/app/interfaces/photo';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userOrders: Array<Order> = []

  public userName: string = " "
/*   public profilePhoto: Photo = {
    filepath: "slikica",
    webviewPath: "assets/images/meal.png"
  } */
  public profilePhoto: string =  "assets/images/meal.png"

  constructor(
    private restaurantService: RestourantService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userName = this.userService._currentUser.value.name
    this.restaurantService.allUserOrders.subscribe((orders) => {
      this.userOrders = orders
    })
  }


  onOrdersTabClicked() {
    console.log("Order tab clicked.")
    this.router.navigate(["../mobile/orders"])
  }


}

import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userOrders: Array<Order> = []
  public folders: Map<number, boolean> = new Map([
    [0, false],
    [1, false],
    [2, false],
  ])


  constructor(
    private restaurantService: RestourantService,
  ) { }

  ngOnInit() {
    this.restaurantService.allUserOrders.subscribe((orders) => {
      this.userOrders = orders
    })
  }

  onFolderClicked(folder: number) {
    let isFolderOpened = this.folders.get(folder)
    if (isFolderOpened)
      this.folders.set(folder, false)
    else {
      for (let i = 0; i < this.folders.keys.length; i++) {
        this.folders.set(i, false)
      }
      this.folders.set(folder, true)
    }
  }



}

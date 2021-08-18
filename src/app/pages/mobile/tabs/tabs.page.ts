import { Component, OnInit } from '@angular/core';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public isBottomNavBarHidden = false

  constructor(
    private restaurantService : RestourantService,
  ) { }

  ngOnInit() {
    this.restaurantService.isBottomNavBarHidden.subscribe((isHidden)=>{
      this.isBottomNavBarHidden = isHidden
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn = false


  constructor(
    private menuController: MenuController,
    private userService: UserService,
    private router: Router,
  ) { 
    this.userService._currentUser.subscribe((value) => {
        this.isLoggedIn = value != null
    })
  }



  logUserOut() {
    this.menuController.close()
    this.userService.logOut()
    
  }

  openMenu() {
    this.menuController.open('first');
  }

  closeMenu() {
    this.menuController.close('first');
  }

}

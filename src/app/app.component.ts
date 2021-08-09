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
  constructor(
    private menuController: MenuController,
    private userService: UserService,
    private router: Router,
  ) { }



  logUserOut() {
    this.menuController.close()
    this.userService.currentUser = null
    
  }

  openMenu() {
    this.menuController.open('first');
  }

  closeMenu() {
    this.menuController.close('first');
  }

}

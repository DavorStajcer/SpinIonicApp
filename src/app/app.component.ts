import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn : boolean
  private userAuthSubscription : Subscription = null

  constructor(
    private menuController: MenuController,
    private userService: UserService,
    private router: Router,
  ) {
    this.onInitApp()
  }

  async onInitApp() {
    if(await this.userService.isUserAuthenticated()){
      this.isLoggedIn = true
      await this.router.navigate(["/web/dashboard"])
      
    }else
      this.observeAuthenticatedUser()
  }


  observeAuthenticatedUser(){
    this.userAuthSubscription = this.userService._currentUser.subscribe((value) => {
      this.isLoggedIn = value != null
    })
  }

  async logUserOut() {
    await this.menuController.close()
    await this.userService.logOut()
    if(this.userAuthSubscription == null)
      this.observeAuthenticatedUser()

  }

  openMenu() {
    this.menuController.open('first');
  }

  closeMenu() {
    this.menuController.close('first');
  }

}

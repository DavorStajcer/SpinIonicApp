import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isLoggedIn : boolean
  public isMobile : boolean 
  private userAuthSubscription : Subscription = null

  constructor(
    private menuController: MenuController,
    private userService: UserService,
    private router: Router,
    private platform : Platform
  ) {
    this.onInitApp()
  }

  async onInitApp() {
    this.userService.isMobile = this.platform.is("mobileweb") ||this.platform.is("mobile")
    this.isMobile = this.userService.isMobile
    if(await this.userService.isUserAuthenticated()){
      this.isLoggedIn = true
     if(this.isMobile){
        await this.router.navigate([`/mobile/tabs/dashboard`])
     }
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart/cart.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

enum MenuPage {
  dashboard,
  menu,
  newdish
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isLoggedIn: boolean
  public isMobile: boolean
  private userAuthSubscription: Subscription = null


  constructor(
    private menuController: MenuController,
    private userService: UserService,
    private router: Router,
    private platform: Platform,
    private storage: StorageService,
    private cartService: CartService,
  ) {
    this.onInitApp()
  }

  async onInitApp() {
    this.userService.isMobile = this.platform.is("mobileweb") || this.platform.is("mobile")
    this.isMobile = this.userService.isMobile
    if (await this.userService.isUserAuthenticated())
      await this.onUserAuthenticated()
    else
      this.observeAuthenticatedUser()

  }

  private async onUserAuthenticated() {
    this.isLoggedIn = true
    if (this.isMobile) {
     /*  await this.storage.getData(`${this.userService._currentUser.value.userid}` + 'cart')
        .then((orders) => {
          this.cartService.dishesInCart.next(orders || [])
        }) */
      await this.router.navigate([`/mobile/tabs/dashboard`])
    }
    else
      await this.router.navigate([`/web/dashboard`])
  }

  observeAuthenticatedUser() {
    this.userAuthSubscription = this.userService._currentUser.subscribe((value) => {
      this.isLoggedIn = value != null
    })
  }

  async logUserOut() {
    await this.menuController.close()
    await this.userService.logOut()
    if (this.userAuthSubscription == null)
      this.observeAuthenticatedUser()
    await this.router.navigate(['/login'])
  }

  openMenu() {
    this.menuController.open('first');
  }

  async closeMenu(page: number) {
    await this.menuController.close('first');
    await this.navigateToPage(page)
  }

  private async navigateToPage(page: number) {
 /*    let navigationUrl: string[] = []
    if (this.userService.isMobile) {
      navigationUrl = ['/login']
      this.logUserOut()
    }
    else */
    let navigationUrl = this.mapNumberToWebPageUrl(page)
    await this.router.navigate(navigationUrl)
  }

  private mapNumberToWebPageUrl(page: number): string[] {
    let navigationUrl = ['/web/dashboard']
    if (page == MenuPage.menu.valueOf())
      navigationUrl = ['/web/menu']
    if (page == MenuPage.newdish.valueOf())
      navigationUrl = ['/web/newDish']
    return navigationUrl
  }


}

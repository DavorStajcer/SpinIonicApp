import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { CartResolverService } from 'src/app/resolvers/mobile/cart/cart.service';
import { OrdersResolverService } from 'src/app/resolvers/mobile/orders/orders.service';
import { RestourantResolverService } from 'src/app/resolvers/restourant/restourant.service';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('../restaurant/restaurant.module').then( m => m.RestaurantPageModule)
      },
    ],
    canActivate: [
      AuthGuard,
    ],
    resolve: {
      restaurant: RestourantResolverService,
      cart: CartResolverService,
      orders : OrdersResolverService,
    }
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

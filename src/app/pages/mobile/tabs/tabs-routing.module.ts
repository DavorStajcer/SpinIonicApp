import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
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
      restaurant: RestourantResolverService
    }
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

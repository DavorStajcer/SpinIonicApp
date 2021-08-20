import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { RestourantResolverService } from './resolvers/restourant/restourant.service';

const routes: Routes = [


  {
    path: "web",
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/web/dashboard/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/web/menu/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'newDish',
        loadChildren: () => import('./pages/web/new-dish/new-dish.module').then(m => m.NewDishPageModule)
      },
    ],
    canActivate: [
      AuthGuard,
    ],
    resolve: {
      restaurant: RestourantResolverService
    }
  },
  {
    path: "mobile",
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./pages/mobile/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/mobile/orders/orders.module').then( m => m.OrdersPageModule)
      },
    ],
    canActivate: [
      AuthGuard,
    ],
    resolve: {
      restaurant: RestourantResolverService
    }
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

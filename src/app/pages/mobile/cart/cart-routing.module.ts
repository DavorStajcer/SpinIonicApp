import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { OrdersResolverService } from 'src/app/resolvers/mobile/orders/orders.service';

import { CartPage } from './cart.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
    canActivate: [
      AuthGuard,
    ],
 /*    resolve: {
      orders: OrdersResolverService,
    } */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPageRoutingModule {}

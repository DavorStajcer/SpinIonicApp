import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { MobileOrderComponent } from 'src/app/components/mobile/mobileOrder/mobile-order/mobile-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule
  ],
  declarations: [
    OrdersPage,
    MobileOrderComponent,
  ]
})
export class OrdersPageModule {}

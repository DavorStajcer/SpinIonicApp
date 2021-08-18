import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { OrderComponent } from 'src/app/components/order/order.component';
import { MobileMealComponent } from 'src/app/components/mobile/mobileMeal/mobile-meal/mobile-meal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [
    CartPage,
    OrderComponent,
    MobileMealComponent,
  ]
})
export class CartPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { OrderComponent } from 'src/app/components/order/order.component';
import { MobileMealComponent } from 'src/app/components/mobile/mobileMeal/mobile-meal/mobile-meal.component';
import { ComponentModule } from 'src/app/components/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ComponentModule
  ],
  declarations: [
    CartPage,
    OrderComponent,
  ]
})
export class CartPageModule {}

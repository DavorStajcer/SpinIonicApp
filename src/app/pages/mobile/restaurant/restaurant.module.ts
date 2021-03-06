import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPageRoutingModule } from './restaurant-routing.module';

import { RestaurantPage } from './restaurant.page';
import { TopNavComponent } from 'src/app/components/mobile/topNav/top-nav/top-nav.component';
import { OrderComponent } from 'src/app/components/order/order.component';
import { MobileMealComponent } from 'src/app/components/mobile/mobileMeal/mobile-meal/mobile-meal.component';
import { ComponentModule } from 'src/app/components/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPageRoutingModule,
    ComponentModule
  ],
  declarations: [
    RestaurantPage,
    TopNavComponent ,
  ]
})
export class RestaurantPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { OrderComponent } from 'src/app/components/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [
    DashboardPage,
    OrderComponent,
    SideNavComponent,
    ]
})
export class DashboardPageModule {}

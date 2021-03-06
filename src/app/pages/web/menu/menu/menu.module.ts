import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { SideNavComponent } from '../../../../components/side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [
    MenuPage,
    MealComponent,
    SideNavComponent
  ]
})
export class MenuPageModule {}

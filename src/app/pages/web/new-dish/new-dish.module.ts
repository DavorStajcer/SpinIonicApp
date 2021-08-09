import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDishPageRoutingModule } from './new-dish-routing.module';

import { NewDishPage } from './new-dish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDishPageRoutingModule
  ],
  declarations: [NewDishPage]
})
export class NewDishPageModule {}

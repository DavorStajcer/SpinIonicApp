import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMealComponent } from '../mobile/mobileMeal/mobile-meal/mobile-meal.component';



@NgModule({
  declarations: [
    MobileMealComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    MobileMealComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDishPage } from './new-dish.page';

const routes: Routes = [
  {
    path: '',
    component: NewDishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDishPageRoutingModule {}
